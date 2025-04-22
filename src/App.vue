<script setup>
// PLAYGROUND

import { ref } from "vue";

import TestVueHiCode from "./components/vue-hi-code.vue";

const contentJs = ref(`// Not all comments are bad...

const num = 33.33;
const variableName = 'variable__name';
const BIG_CONST = () => {};
const operations = 1 + 2 - 3 / (4 * 8);

async function copyCode() {
    try {
        await navigator.clipboard.writeText(props.content);
        emit('copy.test', props.content);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}`)

const contentHTML = ref(`<div class="flex flex-col gap-1">
  <!-- This is a comment -->
  <label for="id">label</label>
  <input type="number" min="0" max="100"/>
</div>`)

const contentCSS = ref(`
.my-class {
  font-size: 12px;
}

/* This is some comment */
div::after {
  content: ''; /* and this is a comment */
}

button.dude > span:not(.moron) ~ .cock {
  color: red;
  font-size: 12px;
  background: radial-gradient(at top left, #6376DD, #FFFFFF);
}
`)

const contentError = ref(`TypeError: Cannot read properties of undefined (reading 'map')
  at Rc.fn (Filename.js:12:45)
  at ys (index.js:10:120)
  at get value (index.js:10:552)
`)

const contentTs = ref(`
type Test = {
  attr: 'value'
}

const myVar: Array<Test>()

  if (test > 1) {
    return 1
  }

const str = new String('str');

type Thing = {}

const thing = {
  type: 'stuff'
}
`)

</script>

<template>
  <main>
    <TestVueHiCode
      language="css"
      :content="contentCSS"
    />

    <TestVueHiCode
      :content="contentError"
      language="error"
      color-error="#E46962"
    />

    <TestVueHiCode
      with-copy
      with-line-numbers
      :content="contentJs" 
      language="javascript"
      title="index.js"
      title-font-size="1rem"
      title-font-family="Arial"
      color-title="#8A8A8A"
      font-family="'Fira Code', monospace"
      background-color="#2A2A2A"
      border-radius="0.3rem"
      padding="1rem"
      font-size="1rem"
      base-text-color="#CCCCCC"
      color-keywords="#B37BAE"
      color-variable-keyword="#559AD3"
      color-function="#DCDCAA"
      color-number="#AEC6A1"
      color-string="#CD9077"
      color-parenthesis="#8A8A8A"
      color-punctuation="#E1E5E8"
      color-brackets="#559AD3"
      color-comment="#8A8A8A"
      copy-icon-color="#CCCCCC"
      color-line-number="#8A8A8A"
      :copy-icon-size="20"
      :copy-icon-stroke-width="1.5"
      color-css-selector="#D7BA7D"
      line-height="1.4rem"
    >
    </TestVueHiCode>
    <TestVueHiCode
      :content="contentHTML"
      language="html"
    />
    <TestVueHiCode
      :content="contentTs"
      language="typescript"
    />
    <VueHiCode 
      with-copy
      with-line-numbers
      :content="contentJs" 
      language="javascript"
      title="index.js"
      title-font-size="1rem"
      title-font-family="Arial"
      color-title="#8A8A8A"
      font-family="'Fira Code', monospace"
      background-color="#2A2A2A"
      border-radius="0.3rem"
      padding="1rem"
      font-size="1rem"
      base-text-color="#CCCCCC"
      color-keywords="#B37BAE"
      color-variable-keyword="#559AD3"
      color-function="#DCDCAA"
      color-number="#AEC6A1"
      color-string="#CD9077"
      color-parenthesis="#8A8A8A"
      color-punctuation="#E1E5E8"
      color-brackets="#559AD3"
      color-comment="#8A8A8A"
      copy-icon-color="#CCCCCC"
      color-line-number="#8A8A8A"
      :copy-icon-size="20"
      :copy-icon-stroke-width="1.5"
      color-css-selector="#D7BA7D"
      line-height="1.4rem"
    />
  </main>
</template>