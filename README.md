# vue-hi-code

[![npm](https://img.shields.io/npm/v/vue-hi-code)](https://github.com/graphieros/vue-hi-code)
[![License](https://img.shields.io/badge/license-MIT-green)](https://github.com/graphieros/vue-hi-code?tab=MIT-1-ov-file#readme)
[![GitHub issues](https://img.shields.io/github/issues/graphieros/vue-hi-code)](https://github.com/graphieros/vue-hi-code/issues)
[![npm](https://img.shields.io/npm/dt/vue-hi-code)](https://github.com/graphieros/vue-hi-code)

A light Vue 3 component to display javascript snippets.

```sh
npm i vue-hi-code
```

![image](https://github.com/user-attachments/assets/07707d06-8285-44a4-a607-192346dfd133)

```js
import { VueHiCode } from "vue-hi-code";
import "vue-hi-code/style.css"; // Include the css

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

| Name                 | Type                            | Required | Default                  |
| -------------------- | ------------------------------- | -------- | ------------------------ |
| backgroundColor      | string                          | no       | "#2A2A2A"                |
| baseTextColor        | string                          | no       | "#CCCCCC"                |
| borderRadius         | string                          | no       | "0.3rem"                 |
| colorBrackets        | string                          | no       | "#559AD3"                |
| colorComment         | string                          | no       | "#8A8A8A"                |
| colorCssSelector     | string                          | no       | "#D7BA7D"                |
| colorError           | string                          | no       | "#E46962"                |
| colorFunction        | string                          | no       | "#DCDCAA"                |
| colorHtmlTag         | string                          | no       | "#559AD3"                |
| colorJsReserved      | string                          | no       | "#4ec9b0"                |
| colorKeywords        | string                          | no       | "#B37BAE"                |
| colorLineNumber      | string                          | no       | "#8A8A8A"                |
| colorNumber          | string                          | no       | "#AEC6A1"                |
| colorParenthesis     | string                          | no       | "#8A8A8A"                |
| colorString          | string                          | no       | "#CD9077"                |
| colorVariableKeyword | string                          | no       | "#559AD3"                |
| content              | string                          | yes      |                          |
| copyIconColor        | string                          | no       | "#CCCCCC"                |
| copyIconSize         | number                          | no       | 20                       |
| copyIconStrokeWidth  | number                          | no       | 1.5                      |
| fontFamily           | string                          | no       | "'Fira code', monospace" |
| fontSize             | string                          | no       | "1rem"                   |
| language             | "javascript" or "html" or "css" | yes      |                          |
| lineHeight           | string                          | no       | "1.4rem"                 |
| padding              | string                          | no       | "1rem"                   |
| showIcon             | boolean                         | no       | false                    |
| title                | string                          | no       | ""                       |
| withCopy             | boolean                         | no       | true                     |
| withLineNumbers      | boolean                         | no       | false                    |

## Emits

Using the props withCopy, a button is displayed on the top right of the component, which will copy the text content on click, and emit "copy" with the content.

```html
<VueHiCode :content="content" language="javascript" @copy="copy" />
```
