import { ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { AngularEditorService } from './angular-editor.service';
import { CustomClass } from './config';
import { SelectOption } from './ae-select/ae-select.component';
export declare class AngularEditorToolbarComponent {
    private r;
    private editorService;
    private doc;
    htmlMode: boolean;
    linkSelected: boolean;
    block: string;
    fontName: string;
    fontSize: string;
    foreColour: any;
    backColor: any;
    headings: SelectOption[];
    fontSizes: SelectOption[];
    customClassId: string;
    _customClasses: CustomClass[];
    customClassList: SelectOption[];
    tagMap: {
        BLOCKQUOTE: string;
        A: string;
    };
    select: string[];
    buttons: string[];
    id: string;
    uploadUrl: string;
    showToolbar: boolean;
    fonts: SelectOption[];
    customClasses: CustomClass[];
    defaultFontName: string;
    defaultFontSize: string;
    hiddenButtons: string[][];
    execute: EventEmitter<string>;
    myInputFile: ElementRef;
    readonly isLinkButtonDisabled: boolean;
    constructor(r: Renderer2, editorService: AngularEditorService, doc: any);
    /**
     * Trigger command from editor header buttons
     * @param command string from toolbar buttons
     */
    triggerCommand(command: string): void;
    /**
     * highlight editor buttons when cursor moved or positioning
     */
    triggerButtons(): void;
    /**
     * trigger highlight editor buttons when cursor moved or positioning in block
     */
    triggerBlocks(nodes: Node[]): void;
    /**
     * insert URL link
     */
    insertUrl(): void;
    /**
     * insert Video link
     */
    insertVideo(): void;
    /** insert color */
    insertColor(color: string, where: string): void;
    /**
     * set font Name/family
     * @param foreColor string
     */
    setFontName(foreColor: string): void;
    /**
     * set font Size
     * @param fontSize string
     */
    setFontSize(fontSize: string): void;
    /**
     * toggle editor mode (WYSIWYG or SOURCE)
     * @param m boolean
     */
    setEditorMode(m: boolean): void;
    /**
     * Upload image when file is selected
     */
    onFileChanged(event: any): void;
    /**
     * Reset Input
     */
    fileReset(): void;
    /**
     * Set custom class
     */
    setCustomClass(classId: string): void;
    isButtonHidden(name: string): boolean;
}
