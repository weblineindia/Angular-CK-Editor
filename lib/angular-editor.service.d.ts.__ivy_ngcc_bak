import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomClass } from './config';
export interface UploadResponse {
    imageUrl: string;
}
export declare class AngularEditorService {
    private http;
    private doc;
    savedSelection: Range | null;
    selectedText: string;
    uploadUrl: string;
    uploadWithCredentials: boolean;
    constructor(http: HttpClient, doc: any);
    /**
     * Executed command from editor header buttons exclude toggleEditorMode
     * @param command string from triggerCommand
     */
    executeCommand(command: string): void;
    /**
     * Create URL link
     * @param url string from UI prompt
     */
    createLink(url: string): void;
    /**
     * insert color either font or background
     *
     * @param color color to be inserted
     * @param where where the color has to be inserted either text/background
     */
    insertColor(color: string, where: string): void;
    /**
     * Set font name
     * @param fontName string
     */
    setFontName(fontName: string): void;
    /**
     * Set font size
     * @param fontSize string
     */
    setFontSize(fontSize: string): void;
    /**
     * Create raw HTML
     * @param html HTML string
     */
    insertHtml(html: string): void;
    /**
     * save selection when the editor is focussed out
     */
    saveSelection: () => void;
    /**
     * restore selection when the editor is focused in
     *
     * saved selection when the editor is focused out
     */
    restoreSelection(): boolean;
    /**
     * setTimeout used for execute 'saveSelection' method in next event loop iteration
     */
    executeInNextQueueIteration(callbackFn: (...args: any[]) => any, timeout?: number): void;
    /** check any selection is made or not */
    private checkSelection;
    /**
     * Upload file to uploadUrl
     * @param file The file
     */
    uploadImage(file: File): Observable<HttpEvent<UploadResponse>>;
    /**
     * Insert image with Url
     * @param imageUrl The imageUrl.
     */
    insertImage(imageUrl: string): void;
    setDefaultParagraphSeparator(separator: string): void;
    createCustomClass(customClass: CustomClass): void;
    insertVideo(videoUrl: string): void;
    private insertYouTubeVideoTag;
    private insertVimeoVideoTag;
    nextNode(node: any): any;
    getRangeSelectedNodes(range: any, includePartiallySelectedContainers: any): any[];
    getSelectedNodes(): any[];
    replaceWithOwnChildren(el: any): void;
    removeSelectedElements(tagNames: any): void;
}
