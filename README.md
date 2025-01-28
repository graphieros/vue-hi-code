# vue-hi-code

A light Vue 3 component to display javascript snippets.

```sh
npm i vue-hi-code
```

```js
import { VueHiCode } from "vue-hi-code";

const content = `
cosnt foo = function(param) {
    return param + 1;
}
`;
```

```html
<VueHiCode :content="content" language="javascript" />
```

## Props

| Name                 | Type                   | Required | Default                  |
| -------------------- | ---------------------- | -------- | ------------------------ |
| content              | string                 | yes      |                          |
| language             | "javascript" or "html" | yes      |                          |
| title                | string                 | no       | ""                       |
| withCopy             | boolean                | no       | true                     |
| withLineNumbers      | boolean                | no       | false                    |
| borderRadius         | string                 | no       | "0.3rem"                 |
| padding              | string                 | no       | "1rem"                   |
| fontFamily           | string                 | no       | "'Fira code', monospace" |
| fontSize             | string                 | no       | "1rem"                   |
| backgroundColor      | string                 | no       | "#2A2A2A"                |
| baseTextColor        | string                 | no       | "#CCCCCC"                |
| colorKeywords        | string                 | no       | "#B37BAE"                |
| colorVariableKeyword | string                 | no       | "#559AD3"                |
| colorFunction        | string                 | no       | "#DCDCAA"                |
| colorNumber          | string                 | no       | "#AEC6A1"                |
| colorString          | string                 | no       | "#CD9077"                |
| colorParenthesis     | string                 | no       | "#8A8A8A"                |
| colorBrackets        | string                 | no       | "#559AD3"                |
| colorComment         | string                 | no       | "#8A8A8A"                |
| colorHtmlTag         | string                 | no       | "#559AD3"                |
| copyIconColor        | string                 | no       | "#CCCCCC"                |
| colorLineNumber      | string                 | no       | "#8A8A8A"                |
| copyIconSize         | number                 | no       | 20                       |
| copyIconStrokeWidth  | number                 | no       | 1.5                      |

## Emits

Using the props withCopy, a button is displayed on the top right of the component, which will copy the text content on click, and emit "copy" with the content.

```html
<VueHiCode :content="content" language="javascript" @copy="copy" />
```
