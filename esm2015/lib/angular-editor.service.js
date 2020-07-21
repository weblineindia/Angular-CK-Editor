/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@angular/common";
/**
 * @record
 */
export function UploadResponse() { }
if (false) {
    /** @type {?} */
    UploadResponse.prototype.imageUrl;
}
export class AngularEditorService {
    /**
     * @param {?} http
     * @param {?} doc
     */
    constructor(http, doc) {
        this.http = http;
        this.doc = doc;
        /**
         * save selection when the editor is focussed out
         */
        this.saveSelection = (/**
         * @return {?}
         */
        () => {
            if (this.doc.getSelection) {
                /** @type {?} */
                const sel = this.doc.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    this.savedSelection = sel.getRangeAt(0);
                    this.selectedText = sel.toString();
                }
            }
            else if (this.doc.getSelection && this.doc.createRange) {
                this.savedSelection = document.createRange();
            }
            else {
                this.savedSelection = null;
            }
        });
    }
    /**
     * Executed command from editor header buttons exclude toggleEditorMode
     * @param {?} command string from triggerCommand
     * @return {?}
     */
    executeCommand(command) {
        /** @type {?} */
        const commands = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre'];
        if (commands.includes(command)) {
            this.doc.execCommand('formatBlock', false, command);
            return;
        }
        this.doc.execCommand(command, false, null);
    }
    /**
     * Create URL link
     * @param {?} url string from UI prompt
     * @return {?}
     */
    createLink(url) {
        if (!url.includes('http')) {
            this.doc.execCommand('createlink', false, url);
        }
        else {
            /** @type {?} */
            const newUrl = '<a href="' + url + '" target="_blank">' + this.selectedText + '</a>';
            this.insertHtml(newUrl);
        }
    }
    /**
     * insert color either font or background
     *
     * @param {?} color color to be inserted
     * @param {?} where where the color has to be inserted either text/background
     * @return {?}
     */
    insertColor(color, where) {
        /** @type {?} */
        const restored = this.restoreSelection();
        if (restored) {
            if (where === 'textColor') {
                this.doc.execCommand('foreColor', false, color);
            }
            else {
                this.doc.execCommand('hiliteColor', false, color);
            }
        }
    }
    /**
     * Set font name
     * @param {?} fontName string
     * @return {?}
     */
    setFontName(fontName) {
        this.doc.execCommand('fontName', false, fontName);
    }
    /**
     * Set font size
     * @param {?} fontSize string
     * @return {?}
     */
    setFontSize(fontSize) {
        this.doc.execCommand('fontSize', false, fontSize);
    }
    /**
     * Create raw HTML
     * @param {?} html HTML string
     * @return {?}
     */
    insertHtml(html) {
        /** @type {?} */
        const isHTMLInserted = this.doc.execCommand('insertHTML', false, html);
        if (!isHTMLInserted) {
            throw new Error('Unable to perform the operation');
        }
    }
    /**
     * restore selection when the editor is focused in
     *
     * saved selection when the editor is focused out
     * @return {?}
     */
    restoreSelection() {
        if (this.savedSelection) {
            if (this.doc.getSelection) {
                /** @type {?} */
                const sel = this.doc.getSelection();
                sel.removeAllRanges();
                sel.addRange(this.savedSelection);
                return true;
            }
            else if (this.doc.getSelection /*&& this.savedSelection.select*/) {
                // this.savedSelection.select();
                return true;
            }
        }
        else {
            return false;
        }
    }
    /**
     * setTimeout used for execute 'saveSelection' method in next event loop iteration
     * @param {?} callbackFn
     * @param {?=} timeout
     * @return {?}
     */
    executeInNextQueueIteration(callbackFn, timeout = 1e2) {
        setTimeout(callbackFn, timeout);
    }
    /**
     * check any selection is made or not
     * @private
     * @return {?}
     */
    checkSelection() {
        /** @type {?} */
        const selectedText = this.savedSelection.toString();
        if (selectedText.length === 0) {
            throw new Error('No Selection Made');
        }
        return true;
    }
    /**
     * Upload file to uploadUrl
     * @param {?} file The file
     * @return {?}
     */
    uploadImage(file) {
        /** @type {?} */
        const uploadData = new FormData();
        uploadData.append('file', file, file.name);
        return this.http.post(this.uploadUrl, uploadData, {
            reportProgress: true,
            observe: 'events',
            withCredentials: this.uploadWithCredentials,
        });
    }
    /**
     * Insert image with Url
     * @param {?} imageUrl The imageUrl.
     * @return {?}
     */
    insertImage(imageUrl) {
        this.doc.execCommand('insertImage', false, imageUrl);
    }
    /**
     * @param {?} separator
     * @return {?}
     */
    setDefaultParagraphSeparator(separator) {
        this.doc.execCommand('defaultParagraphSeparator', false, separator);
    }
    /**
     * @param {?} customClass
     * @return {?}
     */
    createCustomClass(customClass) {
        /** @type {?} */
        let newTag = this.selectedText;
        if (customClass) {
            /** @type {?} */
            const tagName = customClass.tag ? customClass.tag : 'span';
            newTag = '<' + tagName + ' class="' + customClass.class + '">' + this.selectedText + '</' + tagName + '>';
        }
        this.insertHtml(newTag);
    }
    /**
     * @param {?} videoUrl
     * @return {?}
     */
    insertVideo(videoUrl) {
        if (videoUrl.match('www.youtube.com')) {
            this.insertYouTubeVideoTag(videoUrl);
        }
        if (videoUrl.match('vimeo.com')) {
            this.insertVimeoVideoTag(videoUrl);
        }
    }
    /**
     * @private
     * @param {?} videoUrl
     * @return {?}
     */
    insertYouTubeVideoTag(videoUrl) {
        /** @type {?} */
        const id = videoUrl.split('v=')[1];
        /** @type {?} */
        const imageUrl = `https://img.youtube.com/vi/${id}/0.jpg`;
        /** @type {?} */
        const thumbnail = `
      <div style='position: relative'>
        <img style='position: absolute; left:200px; top:140px'
             src="https://img.icons8.com/color/96/000000/youtube-play.png"/>
        <a href='${videoUrl}' target='_blank'>
          <img src="${imageUrl}" alt="click to watch"/>
        </a>
      </div>`;
        this.insertHtml(thumbnail);
    }
    /**
     * @private
     * @param {?} videoUrl
     * @return {?}
     */
    insertVimeoVideoTag(videoUrl) {
        /** @type {?} */
        const sub = this.http.get(`https://vimeo.com/api/oembed.json?url=${videoUrl}`).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            /** @type {?} */
            const imageUrl = data.thumbnail_url_with_play_button;
            /** @type {?} */
            const thumbnail = `<div>
        <a href='${videoUrl}' target='_blank'>
          <img src="${imageUrl}" alt="${data.title}"/>
        </a>
      </div>`;
            this.insertHtml(thumbnail);
            sub.unsubscribe();
        }));
    }
    /**
     * @param {?} node
     * @return {?}
     */
    nextNode(node) {
        if (node.hasChildNodes()) {
            return node.firstChild;
        }
        else {
            while (node && !node.nextSibling) {
                node = node.parentNode;
            }
            if (!node) {
                return null;
            }
            return node.nextSibling;
        }
    }
    /**
     * @param {?} range
     * @param {?} includePartiallySelectedContainers
     * @return {?}
     */
    getRangeSelectedNodes(range, includePartiallySelectedContainers) {
        /** @type {?} */
        let node = range.startContainer;
        /** @type {?} */
        const endNode = range.endContainer;
        /** @type {?} */
        let rangeNodes = [];
        // Special case for a range that is contained within a single node
        if (node === endNode) {
            rangeNodes = [node];
        }
        else {
            // Iterate nodes until we hit the end container
            while (node && node !== endNode) {
                rangeNodes.push(node = this.nextNode(node));
            }
            // Add partially selected nodes at the start of the range
            node = range.startContainer;
            while (node && node !== range.commonAncestorContainer) {
                rangeNodes.unshift(node);
                node = node.parentNode;
            }
        }
        // Add ancestors of the range container, if required
        if (includePartiallySelectedContainers) {
            node = range.commonAncestorContainer;
            while (node) {
                rangeNodes.push(node);
                node = node.parentNode;
            }
        }
        return rangeNodes;
    }
    /**
     * @return {?}
     */
    getSelectedNodes() {
        /** @type {?} */
        const nodes = [];
        if (this.doc.getSelection) {
            /** @type {?} */
            const sel = this.doc.getSelection();
            for (let i = 0, len = sel.rangeCount; i < len; ++i) {
                nodes.push.apply(nodes, this.getRangeSelectedNodes(sel.getRangeAt(i), true));
            }
        }
        return nodes;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    replaceWithOwnChildren(el) {
        /** @type {?} */
        const parent = el.parentNode;
        while (el.hasChildNodes()) {
            parent.insertBefore(el.firstChild, el);
        }
        parent.removeChild(el);
    }
    /**
     * @param {?} tagNames
     * @return {?}
     */
    removeSelectedElements(tagNames) {
        /** @type {?} */
        const tagNamesArray = tagNames.toLowerCase().split(',');
        this.getSelectedNodes().forEach((/**
         * @param {?} node
         * @return {?}
         */
        (node) => {
            if (node.nodeType === 1 &&
                tagNamesArray.indexOf(node.tagName.toLowerCase()) > -1) {
                // Remove the node and replace it with its children
                this.replaceWithOwnChildren(node);
            }
        }));
    }
}
AngularEditorService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
AngularEditorService.ctorParameters = () => [
    { type: HttpClient },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
/** @nocollapse */ AngularEditorService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AngularEditorService_Factory() { return new AngularEditorService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.DOCUMENT)); }, token: AngularEditorService, providedIn: "root" });
if (false) {
    /** @type {?} */
    AngularEditorService.prototype.savedSelection;
    /** @type {?} */
    AngularEditorService.prototype.selectedText;
    /** @type {?} */
    AngularEditorService.prototype.uploadUrl;
    /** @type {?} */
    AngularEditorService.prototype.uploadWithCredentials;
    /**
     * save selection when the editor is focussed out
     * @type {?}
     */
    AngularEditorService.prototype.saveSelection;
    /**
     * @type {?}
     * @private
     */
    AngularEditorService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    AngularEditorService.prototype.doc;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1lZGl0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brb2xrb3YvYW5ndWxhci1lZGl0b3IvIiwic291cmNlcyI6WyJsaWIvYW5ndWxhci1lZGl0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLFVBQVUsRUFBWSxNQUFNLHNCQUFzQixDQUFDO0FBRTNELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7OztBQUd6QyxvQ0FFQzs7O0lBREMsa0NBQWlCOztBQU1uQixNQUFNLE9BQU8sb0JBQW9COzs7OztJQU8vQixZQUNVLElBQWdCLEVBQ0UsR0FBUTtRQUQxQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ0UsUUFBRyxHQUFILEdBQUcsQ0FBSzs7OztRQThFN0Isa0JBQWE7OztRQUFHLEdBQVMsRUFBRTtZQUNoQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFOztzQkFDbkIsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFO2dCQUNuQyxJQUFJLEdBQUcsQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDLFVBQVUsRUFBRTtvQkFDcEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4QyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDcEM7YUFDRjtpQkFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFO2dCQUN4RCxJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUM5QztpQkFBTTtnQkFDTCxJQUFJLENBQUMsY0FBYyxHQUFHLElB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QyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLE9BQU87Ozs7UUFBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3ZDLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDO2dCQUNyQixhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDeEQsbURBQW1EO2dCQUNuRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbkM7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7OztZQXJTRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFYTyxVQUFVOzRDQXFCYixNQUFNLFNBQUMsUUFBUTs7Ozs7SUFQbEIsOENBQTZCOztJQUM3Qiw0Q0FBcUI7O0lBQ3JCLHlDQUFrQjs7SUFDbEIscURBQStCOzs7OztJQWtGL0IsNkNBWUM7Ozs7O0lBM0ZDLG9DQUF3Qjs7Ozs7SUFDeEIsbUNBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwRXZlbnR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtDdXN0b21DbGFzc30gZnJvbSAnLi9jb25maWcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFVwbG9hZFJlc3BvbnNlIHtcbiAgaW1hZ2VVcmw6IHN0cmluZztcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhckVkaXRvclNlcnZpY2Uge1xuXG4gIHNhdmVkU2VsZWN0aW9uOiBSYW5nZSB8IG51bGw7XG4gIHNlbGVjdGVkVGV4dDogc3RyaW5nO1xuICB1cGxvYWRVcmw6IHN0cmluZztcbiAgdXBsb2FkV2l0aENyZWRlbnRpYWxzOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvYzogYW55XG4gICkgeyB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVkIGNvbW1hbmQgZnJvbSBlZGl0b3IgaGVhZGVyIGJ1dHRvbnMgZXhjbHVkZSB0b2dnbGVFZGl0b3JNb2RlXG4gICAqIEBwYXJhbSBjb21tYW5kIHN0cmluZyBmcm9tIHRyaWdnZXJDb21tYW5kXG4gICAqL1xuICBleGVjdXRlQ29tbWFuZChjb21tYW5kOiBzdHJpbmcpIHtcbiAgICBjb25zdCBjb21tYW5kcyA9IFsnaDEnLCAnaDInLCAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnLCAncCcsICdwcmUnXTtcbiAgICBpZiAoY29tbWFuZHMuaW5jbHVkZXMoY29tbWFuZCkpIHtcbiAgICAgIHRoaXMuZG9jLmV4ZWNDb21tYW5kKCdmb3JtYXRCbG9jaycsIGZhbHNlLCBjb21tYW5kKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kb2MuZXhlY0NvbW1hbmQoY29tbWFuZCwgZmFsc2UsIG51bGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBVUkwgbGlua1xuICAgKiBAcGFyYW0gdXJsIHN0cmluZyBmcm9tIFVJIHByb21wdFxuICAgKi9cbiAgY3JlYXRlTGluayh1cmw6IHN0cmluZykge1xuICAgIGlmICghdXJsLmluY2x1ZGVzKCdodHRwJykpIHtcbiAgICAgIHRoaXMuZG9jLmV4ZWNDb21tYW5kKCdjcmVhdGVsaW5rJywgZmFsc2UsIHVybCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5ld1VybCA9ICc8YSBocmVmPVwiJyArIHVybCArICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj4nICsgdGhpcy5zZWxlY3RlZFRleHQgKyAnPC9hPic7XG4gICAgICB0aGlzLmluc2VydEh0bWwobmV3VXJsKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaW5zZXJ0IGNvbG9yIGVpdGhlciBmb250IG9yIGJhY2tncm91bmRcbiAgICpcbiAgICogQHBhcmFtIGNvbG9yIGNvbG9yIHRvIGJlIGluc2VydGVkXG4gICAqIEBwYXJhbSB3aGVyZSB3aGVyZSB0aGUgY29sb3IgaGFzIHRvIGJlIGluc2VydGVkIGVpdGhlciB0ZXh0L2JhY2tncm91bmRcbiAgICovXG4gIGluc2VydENvbG9yKGNvbG9yOiBzdHJpbmcsIHdoZXJlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCByZXN0b3JlZCA9IHRoaXMucmVzdG9yZVNlbGVjdGlvbigpO1xuICAgIGlmIChyZXN0b3JlZCkge1xuICAgICAgaWYgKHdoZXJlID09PSAndGV4dENvbG9yJykge1xuICAgICAgICB0aGlzLmRvYy5leGVjQ29tbWFuZCgnZm9yZUNvbG9yJywgZmFsc2UsIGNvbG9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZG9jLmV4ZWNDb21tYW5kKCdoaWxpdGVDb2xvcicsIGZhbHNlLCBjb2xvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCBmb250IG5hbWVcbiAgICogQHBhcmFtIGZvbnROYW1lIHN0cmluZ1xuICAgKi9cbiAgc2V0Rm9udE5hbWUoZm9udE5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuZG9jLmV4ZWNDb21tYW5kKCdmb250TmFtZScsIGZhbHNlLCBmb250TmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGZvbnQgc2l6ZVxuICAgKiBAcGFyYW0gZm9udFNpemUgc3RyaW5nXG4gICAqL1xuICBzZXRGb250U2l6ZShmb250U2l6ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5kb2MuZXhlY0NvbW1hbmQoJ2ZvbnRTaXplJywgZmFsc2UsIGZvbnRTaXplKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgcmF3IEhUTUxcbiAgICogQHBhcmFtIGh0bWwgSFRNTCBzdHJpbmdcbiAgICovXG4gIGluc2VydEh0bWwoaHRtbDogc3RyaW5nKTogdm9pZCB7XG5cbiAgICBjb25zdCBpc0hUTUxJbnNlcnRlZCA9IHRoaXMuZG9jLmV4ZWNDb21tYW5kKCdpbnNlcnRIVE1MJywgZmFsc2UsIGh0bWwpO1xuXG4gICAgaWYgKCFpc0hUTUxJbnNlcnRlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gcGVyZm9ybSB0aGUgb3BlcmF0aW9uJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHNhdmUgc2VsZWN0aW9uIHdoZW4gdGhlIGVkaXRvciBpcyBmb2N1c3NlZCBvdXRcbiAgICovXG4gIHB1YmxpYyBzYXZlU2VsZWN0aW9uID0gKCk6IHZvaWQgPT4ge1xuICAgIGlmICh0aGlzLmRvYy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgIGNvbnN0IHNlbCA9IHRoaXMuZG9jLmdldFNlbGVjdGlvbigpO1xuICAgICAgaWYgKHNlbC5nZXRSYW5nZUF0ICYmIHNlbC5yYW5nZUNvdW50KSB7XG4gICAgICAgIHRoaXMuc2F2ZWRTZWxlY3Rpb24gPSBzZWwuZ2V0UmFuZ2VBdCgwKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRleHQgPSBzZWwudG9TdHJpbmcoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuZG9jLmdldFNlbGVjdGlvbiAmJiB0aGlzLmRvYy5jcmVhdGVSYW5nZSkge1xuICAgICAgdGhpcy5zYXZlZFNlbGVjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2F2ZWRTZWxlY3Rpb24gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZXN0b3JlIHNlbGVjdGlvbiB3aGVuIHRoZSBlZGl0b3IgaXMgZm9jdXNlZCBpblxuICAgKlxuICAgKiBzYXZlZCBzZWxlY3Rpb24gd2hlbiB0aGUgZWRpdG9yIGlzIGZvY3VzZWQgb3V0XG4gICAqL1xuICByZXN0b3JlU2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnNhdmVkU2VsZWN0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb2MuZ2V0U2VsZWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IHNlbCA9IHRoaXMuZG9jLmdldFNlbGVjdGlvbigpO1xuICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgIHNlbC5hZGRSYW5nZSh0aGlzLnNhdmVkU2VsZWN0aW9uKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZG9jLmdldFNlbGVjdGlvbiAvKiYmIHRoaXMuc2F2ZWRTZWxlY3Rpb24uc2VsZWN0Ki8pIHtcbiAgICAgICAgLy8gdGhpcy5zYXZlZFNlbGVjdGlvbi5zZWxlY3QoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogc2V0VGltZW91dCB1c2VkIGZvciBleGVjdXRlICdzYXZlU2VsZWN0aW9uJyBtZXRob2QgaW4gbmV4dCBldmVudCBsb29wIGl0ZXJhdGlvblxuICAgKi9cbiAgcHVibGljIGV4ZWN1dGVJbk5leHRRdWV1ZUl0ZXJhdGlvbihjYWxsYmFja0ZuOiAoLi4uYXJnczogYW55W10pID0+IGFueSwgdGltZW91dCA9IDFlMik6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoY2FsbGJhY2tGbiwgdGltZW91dCk7XG4gIH1cblxuICAvKiogY2hlY2sgYW55IHNlbGVjdGlvbiBpcyBtYWRlIG9yIG5vdCAqL1xuICBwcml2YXRlIGNoZWNrU2VsZWN0aW9uKCk6IGFueSB7XG5cbiAgICBjb25zdCBzZWxlY3RlZFRleHQgPSB0aGlzLnNhdmVkU2VsZWN0aW9uLnRvU3RyaW5nKCk7XG5cbiAgICBpZiAoc2VsZWN0ZWRUZXh0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBTZWxlY3Rpb24gTWFkZScpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGxvYWQgZmlsZSB0byB1cGxvYWRVcmxcbiAgICogQHBhcmFtIGZpbGUgVGhlIGZpbGVcbiAgICovXG4gIHVwbG9hZEltYWdlKGZpbGU6IEZpbGUpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxVcGxvYWRSZXNwb25zZT4+IHtcblxuICAgIGNvbnN0IHVwbG9hZERhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG5cbiAgICB1cGxvYWREYXRhLmFwcGVuZCgnZmlsZScsIGZpbGUsIGZpbGUubmFtZSk7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8VXBsb2FkUmVzcG9uc2U+KHRoaXMudXBsb2FkVXJsLCB1cGxvYWREYXRhLCB7XG4gICAgICByZXBvcnRQcm9ncmVzczogdHJ1ZSxcbiAgICAgIG9ic2VydmU6ICdldmVudHMnLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiB0aGlzLnVwbG9hZFdpdGhDcmVkZW50aWFscyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnNlcnQgaW1hZ2Ugd2l0aCBVcmxcbiAgICogQHBhcmFtIGltYWdlVXJsIFRoZSBpbWFnZVVybC5cbiAgICovXG4gIGluc2VydEltYWdlKGltYWdlVXJsOiBzdHJpbmcpIHtcbiAgICB0aGlzLmRvYy5leGVjQ29tbWFuZCgnaW5zZXJ0SW1hZ2UnLCBmYWxzZSwgaW1hZ2VVcmwpO1xuICB9XG5cbiAgc2V0RGVmYXVsdFBhcmFncmFwaFNlcGFyYXRvcihzZXBhcmF0b3I6IHN0cmluZykge1xuICAgIHRoaXMuZG9jLmV4ZWNDb21tYW5kKCdkZWZhdWx0UGFyYWdyYXBoU2VwYXJhdG9yJywgZmFsc2UsIHNlcGFyYXRvcik7XG4gIH1cblxuICBjcmVhdGVDdXN0b21DbGFzcyhjdXN0b21DbGFzczogQ3VzdG9tQ2xhc3MpIHtcbiAgICBsZXQgbmV3VGFnID0gdGhpcy5zZWxlY3RlZFRleHQ7XG4gICAgaWYgKGN1c3RvbUNsYXNzKSB7XG4gICAgICBjb25zdCB0YWdOYW1lID0gY3VzdG9tQ2xhc3MudGFnID8gY3VzdG9tQ2xhc3MudGFnIDogJ3NwYW4nO1xuICAgICAgbmV3VGFnID0gJzwnICsgdGFnTmFtZSArICcgY2xhc3M9XCInICsgY3VzdG9tQ2xhc3MuY2xhc3MgKyAnXCI+JyArIHRoaXMuc2VsZWN0ZWRUZXh0ICsgJzwvJyArIHRhZ05hbWUgKyAnPic7XG4gICAgfVxuICAgIHRoaXMuaW5zZXJ0SHRtbChuZXdUYWcpO1xuICB9XG5cbiAgaW5zZXJ0VmlkZW8odmlkZW9Vcmw6IHN0cmluZykge1xuICAgIGlmICh2aWRlb1VybC5tYXRjaCgnd3d3LnlvdXR1YmUuY29tJykpIHtcbiAgICAgIHRoaXMuaW5zZXJ0WW91VHViZVZpZGVvVGFnKHZpZGVvVXJsKTtcbiAgICB9XG4gICAgaWYgKHZpZGVvVXJsLm1hdGNoKCd2aW1lby5jb20nKSkge1xuICAgICAgdGhpcy5pbnNlcnRWaW1lb1ZpZGVvVGFnKHZpZGVvVXJsKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluc2VydFlvdVR1YmVWaWRlb1RhZyh2aWRlb1VybDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgaWQgPSB2aWRlb1VybC5zcGxpdCgndj0nKVsxXTtcbiAgICBjb25zdCBpbWFnZVVybCA9IGBodHRwczovL2ltZy55b3V0dWJlLmNvbS92aS8ke2lkfS8wLmpwZ2A7XG4gICAgY29uc3QgdGh1bWJuYWlsID0gYFxuICAgICAgPGRpdiBzdHlsZT0ncG9zaXRpb246IHJlbGF0aXZlJz5cbiAgICAgICAgPGltZyBzdHlsZT0ncG9zaXRpb246IGFic29sdXRlOyBsZWZ0OjIwMHB4OyB0b3A6MTQwcHgnXG4gICAgICAgICAgICAgc3JjPVwiaHR0cHM6Ly9pbWcuaWNvbnM4LmNvbS9jb2xvci85Ni8wMDAwMDAveW91dHViZS1wbGF5LnBuZ1wiLz5cbiAgICAgICAgPGEgaHJlZj0nJHt2aWRlb1VybH0nIHRhcmdldD0nX2JsYW5rJz5cbiAgICAgICAgICA8aW1nIHNyYz1cIiR7aW1hZ2VVcmx9XCIgYWx0PVwiY2xpY2sgdG8gd2F0Y2hcIi8+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvZGl2PmA7XG4gICAgdGhpcy5pbnNlcnRIdG1sKHRodW1ibmFpbCk7XG4gIH1cblxuICBwcml2YXRlIGluc2VydFZpbWVvVmlkZW9UYWcodmlkZW9Vcmw6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHN1YiA9IHRoaXMuaHR0cC5nZXQ8YW55PihgaHR0cHM6Ly92aW1lby5jb20vYXBpL29lbWJlZC5qc29uP3VybD0ke3ZpZGVvVXJsfWApLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIGNvbnN0IGltYWdlVXJsID0gZGF0YS50aHVtYm5haWxfdXJsX3dpdGhfcGxheV9idXR0b247XG4gICAgICBjb25zdCB0aHVtYm5haWwgPSBgPGRpdj5cbiAgICAgICAgPGEgaHJlZj0nJHt2aWRlb1VybH0nIHRhcmdldD0nX2JsYW5rJz5cbiAgICAgICAgICA8aW1nIHNyYz1cIiR7aW1hZ2VVcmx9XCIgYWx0PVwiJHtkYXRhLnRpdGxlfVwiLz5cbiAgICAgICAgPC9hPlxuICAgICAgPC9kaXY+YDtcbiAgICAgIHRoaXMuaW5zZXJ0SHRtbCh0aHVtYm5haWwpO1xuICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfSk7XG4gIH1cblxuICBuZXh0Tm9kZShub2RlKSB7XG4gICAgaWYgKG5vZGUuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICByZXR1cm4gbm9kZS5maXJzdENoaWxkO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aGlsZSAobm9kZSAmJiAhbm9kZS5uZXh0U2libGluZykge1xuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgfVxuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5vZGUubmV4dFNpYmxpbmc7XG4gICAgfVxuICB9XG5cbiAgZ2V0UmFuZ2VTZWxlY3RlZE5vZGVzKHJhbmdlLCBpbmNsdWRlUGFydGlhbGx5U2VsZWN0ZWRDb250YWluZXJzKSB7XG4gICAgbGV0IG5vZGUgPSByYW5nZS5zdGFydENvbnRhaW5lcjtcbiAgICBjb25zdCBlbmROb2RlID0gcmFuZ2UuZW5kQ29udGFpbmVyO1xuICAgIGxldCByYW5nZU5vZGVzID0gW107XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgZm9yIGEgcmFuZ2UgdGhhdCBpcyBjb250YWluZWQgd2l0aGluIGEgc2luZ2xlIG5vZGVcbiAgICBpZiAobm9kZSA9PT0gZW5kTm9kZSkge1xuICAgICAgcmFuZ2VOb2RlcyA9IFtub2RlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSXRlcmF0ZSBub2RlcyB1bnRpbCB3ZSBoaXQgdGhlIGVuZCBjb250YWluZXJcbiAgICAgIHdoaWxlIChub2RlICYmIG5vZGUgIT09IGVuZE5vZGUpIHtcbiAgICAgICAgcmFuZ2VOb2Rlcy5wdXNoKCBub2RlID0gdGhpcy5uZXh0Tm9kZShub2RlKSApO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgcGFydGlhbGx5IHNlbGVjdGVkIG5vZGVzIGF0IHRoZSBzdGFydCBvZiB0aGUgcmFuZ2VcbiAgICAgIG5vZGUgPSByYW5nZS5zdGFydENvbnRhaW5lcjtcbiAgICAgIHdoaWxlIChub2RlICYmIG5vZGUgIT09IHJhbmdlLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyKSB7XG4gICAgICAgIHJhbmdlTm9kZXMudW5zaGlmdChub2RlKTtcbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgYW5jZXN0b3JzIG9mIHRoZSByYW5nZSBjb250YWluZXIsIGlmIHJlcXVpcmVkXG4gICAgaWYgKGluY2x1ZGVQYXJ0aWFsbHlTZWxlY3RlZENvbnRhaW5lcnMpIHtcbiAgICAgIG5vZGUgPSByYW5nZS5jb21tb25BbmNlc3RvckNvbnRhaW5lcjtcbiAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgIHJhbmdlTm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmFuZ2VOb2RlcztcbiAgfVxuXG4gIGdldFNlbGVjdGVkTm9kZXMoKSB7XG4gICAgY29uc3Qgbm9kZXMgPSBbXTtcbiAgICBpZiAodGhpcy5kb2MuZ2V0U2VsZWN0aW9uKSB7XG4gICAgICBjb25zdCBzZWwgPSB0aGlzLmRvYy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzZWwucmFuZ2VDb3VudDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgIG5vZGVzLnB1c2guYXBwbHkobm9kZXMsIHRoaXMuZ2V0UmFuZ2VTZWxlY3RlZE5vZGVzKHNlbC5nZXRSYW5nZUF0KGkpLCB0cnVlKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2RlcztcbiAgfVxuXG4gIHJlcGxhY2VXaXRoT3duQ2hpbGRyZW4oZWwpIHtcbiAgICBjb25zdCBwYXJlbnQgPSBlbC5wYXJlbnROb2RlO1xuICAgIHdoaWxlIChlbC5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoZWwuZmlyc3RDaGlsZCwgZWwpO1xuICAgIH1cbiAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoZWwpO1xuICB9XG5cbiAgcmVtb3ZlU2VsZWN0ZWRFbGVtZW50cyh0YWdOYW1lcykge1xuICAgIGNvbnN0IHRhZ05hbWVzQXJyYXkgPSB0YWdOYW1lcy50b0xvd2VyQ2FzZSgpLnNwbGl0KCcsJyk7XG4gICAgdGhpcy5nZXRTZWxlY3RlZE5vZGVzKCkuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEgJiZcbiAgICAgICAgdGFnTmFtZXNBcnJheS5pbmRleE9mKG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpKSA+IC0xKSB7XG4gICAgICAgIC8vIFJlbW92ZSB0aGUgbm9kZSBhbmQgcmVwbGFjZSBpdCB3aXRoIGl0cyBjaGlsZHJlblxuICAgICAgICB0aGlzLnJlcGxhY2VXaXRoT3duQ2hpbGRyZW4obm9kZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==