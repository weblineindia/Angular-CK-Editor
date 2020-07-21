# AngularJS - CK Editor

A simple, native and easy-to-use WYSIWYG / Rich Text editor built in AngularJS.

# Table of contents

- [Demo](#demo)
- [Getting started](#getting-started)
- [API](#api)
- [Want to Contribute?](#want-to-contribute)
- [Collection of Other Components](#collection-of-components)
- [Changelog](#changelog)
- [Credits](#credits)
- [License](#license)
- [Keywords](#Keywords)

## Demo

![Nov-27-2019 17-26-29](https://user-images.githubusercontent.com/216412/69763434-259cd800-113b-11ea-918f-0565ebce0e48.gif)

## Getting Started

### Installation

Install via npm package manager

```bash
npm install angular-weblineindia-ck-editor --save
```

### Usage

Import `angular-editor` module

```js
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from 'angular-weblineindia-ck-editor';

@NgModule({
  imports: [ HttpClientModule, AngularEditorModule ]
})
```

Then in HTML

```html
<angular-editor
  [placeholder]="'Enter text here...'"
  [(ngModel)]="htmlContent"
></angular-editor>
```

or for usage with reactive forms

```html
<angular-editor
  formControlName="htmlContent"
  [config]="editorConfig"
></angular-editor>
```

if you using more than one editor on same page set `id` property

```html
<angular-editor
  id="editor1"
  formControlName="htmlContent1"
  [config]="editorConfig"
></angular-editor>
<angular-editor
  id="editor2"
  formControlName="htmlContent2"
  [config]="editorConfig"
></angular-editor>
```

where

```js
import { AngularEditorConfig } from "@kolkov/angular-editor";

editorConfig: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: "auto",
  minHeight: "0",
  maxHeight: "auto",
  width: "auto",
  minWidth: "0",
  translate: "yes",
  enableToolbar: true,
  showToolbar: true,
  placeholder: "Enter text here...",
  defaultParagraphSeparator: "",
  defaultFontName: "",
  defaultFontSize: "",
  fonts: [
    { class: "arial", name: "Arial" },
    { class: "times-new-roman", name: "Times New Roman" },
    { class: "calibri", name: "Calibri" },
    { class: "comic-sans-ms", name: "Comic Sans MS" }
  ],
  customClasses: [
    {
      name: "quote",
      class: "quote"
    },
    {
      name: "redText",
      class: "redText"
    },
    {
      name: "titleText",
      class: "titleText",
      tag: "h1"
    }
  ],
  uploadUrl: "v1/image",
  uploadWithCredentials: false,
  sanitize: true,
  toolbarPosition: "top",
  toolbarHiddenButtons: [["bold", "italic"], ["fontSize"]]
};
```

For `ngModel` to work, you must import `FormsModule` from `@angular/forms`, or for `formControlName`, you must import `ReactiveFormsModule` from `@angular/forms`

## API

### Inputs

| Input       | Type                  | Default          | Required | Description                                        |
| ----------- | --------------------- | ---------------- | -------- | -------------------------------------------------- |
| id          | `string`              | `-`              | no       | Id property when multiple editor used on same page |
| [config]    | `AngularEditorConfig` | `default config` | no       | config for the editor                              |
| placeholder | `string`              | `-`              | no       | Set custom placeholder for input area              |
| tabIndex    | `number`              | `-`              | no       | Set Set tabindex on angular-editor                 |

### Outputs

| Output     | Description                                     |
| ---------- | ----------------------------------------------- |
| (html)     | Output html                                     |
| (viewMode) | Fired when switched visual and html source mode |
| (blur)     | Fired when editor blur                          |
| (focus)    | Fired when editor focus                         |

### Methods

| Name  | Description                |
| ----- | -------------------------- |
| focus | Focuses the editor element |

### Other

| Name                | Type          | Description                                    |
| ------------------- | ------------- | ---------------------------------------------- |
| AngularEditorConfig | configuration | Configuration for the AngularEditor component. |

### Configuration

| Input                     | Type            | Default | Required | Description                                                         |
| ------------------------- | --------------- | ------- | -------- | ------------------------------------------------------------------- |
| editable                  | `bolean`        | `true`  | no       | Set editing enabled or not                                          |
| spellcheck                | `bolean`        | `true`  | no       | Set spellchecking enabled or not                                    |
| translate                 | `sting`         | `yes`   | no       | Set translating enabled or not                                      |
| sanitize                  | `bolean`        | `true`  | no       | Set DOM sanitizing enabled or not                                   |
| height                    | `string`        | `auto`  | no       | Set height of the editor                                            |
| minHeight                 | `string`        | `0`     | no       | Set minimum height of the editor                                    |
| maxHeight                 | `string`        | `auto`  | no       | Set maximum height of the editor                                    |
| width                     | `string`        | `auto`  | no       | Set width of the editor                                             |
| minWidth                  | `string`        | `0`     | no       | Set minimum width of the editor                                     |
| enableToolbar             | `bolean`        | `true`  | no       | Set toolbar enabled or not                                          |
| showToolbar               | `bolean`        | `true`  | no       | Set toolbar visible or not                                          |
| toolbarPosition           | `string`        | `top`   | no       | Set toolbar position top or bottom                                  |
| placeholder               | `string`        | `-`     | no       | Set placeholder text                                                |
| defaultParagraphSeparator | `string`        | `-`     | no       | Set default paragraph separator such as `p`                         |
| defaultFontName           | `string`        | `-`     | no       | Set default font such as `Comic Sans MS`                            |
| defaultFontSize           | `string`        | `-`     | no       | Set default font size such as `1` - `7`                             |
| uploadUrl                 | `string`        | `-`     | no       | Set image upload endpoint `https://api.exapple.com/v1/image/upload` |
| uploadWithCredentials     | `bolean`        | `false` | no       | Set passing or not credentials in the image upload call             |
| fonts                     | `Font[]`        | `-`     | no       | Set array of available fonts `[{name, class},...]`                  |
| customClasses             | `CustomClass[]` | `-`     | no       | Set array of available fonts `[{name, class, tag},...]`             |
| outline                   | `bolean`        | `true`  | no       | Set outline of the editor if in focus                               |
| toolbarHiddenButtons      | `string[][]`    | `-`     | no       | Set of the array of button names or elements to hide                |

```js
toolbarHiddenButtons: [
  [
    "undo",
    "redo",
    "bold",
    "italic",
    "underline",
    "strikeThrough",
    "subscript",
    "superscript",
    "justifyLeft",
    "justifyCenter",
    "justifyRight",
    "justifyFull",
    "indent",
    "outdent",
    "insertUnorderedList",
    "insertOrderedList",
    "heading",
    "fontName"
  ],
  [
    "fontSize",
    "textColor",
    "backgroundColor",
    "customClasses",
    "link",
    "unlink",
    "insertImage",
    "insertVideo",
    "insertHorizontalRule",
    "removeFormat",
    "toggleEditorMode"
  ]
];
```

## Want to Contribute?

- Created something awesome, made this code better, added some functionality, or whatever (this is the hardest part).
- [Fork it](http://help.github.com/forking/).
- Create new branch to contribute your changes.
- Commit all your changes to your branch.
- Submit a [pull request](http://help.github.com/pull-requests/).

---

## Collection of Components

We have built many other components and free resources for software development in various programming languages. Kindly click here to view our [Free Resources for Software Development](https://www.weblineindia.com/software-development-resources.html).

---

## Changelog

Detailed changes for each release are documented in [CHANGELOG.md](./CHANGELOG.md).

## Credits

angular-weblineindia-ck-editor is inspired by [@kolkov/angular-editor](https://www.npmjs.com/package/@kolkov/angular-editor).

## License

[MIT](https://github.com/weblineindia/AngularJS-CK-Editor/blob/master/LICENSE)

## Keywords

angular-editor, angular-native-editor, angularjs-wysiwyg, ck-editor, angular-wysiwyg-editor, wysiwyg-editor, angularjs-rich-text-editor, rich-text-editor
