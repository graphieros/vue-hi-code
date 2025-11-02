<script setup>
// PLAYGROUND

import { ref } from "vue";

import TestVueHiCode from "./components/vue-hi-code.vue";

const contentJs = ref(0)

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

button.test > span:not(.smth) ~ .selector {
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

const special = [null, Infinity, -Infinity, undefined, NaN, true, false];

const myVar: Array<Test>()

  if (test > 1) {
    return 1
  }

const str = new String('str');

type Thing = {}

const thing = {
  type?: 'stuff',
  type: 'stuff'
}

const obj: VueUiXyConfig = {};
`)

</script>

<template>
  <main>
    <TestVueHiCode
      language="css"
      :content="contentCSS"
      showIcon
      title="css"
    />

    <TestVueHiCode
      :content="contentError"
      language="error"
      color-error="#E46962"
      showIcon
      title="error"
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
      color-curly-brackets="##8A8A8A"
      color-comment="#8A8A8A"
      copy-icon-color="#CCCCCC"
      color-line-number="#8A8A8A"
      :copy-icon-size="20"
      :copy-icon-stroke-width="1.5"
      color-css-selector="#D7BA7D"
      line-height="1.4rem"
      :show-icon="true"
      
    >
    </TestVueHiCode>
    <TestVueHiCode
      :content="contentHTML"
      language="html"
      showIcon
    />
    <TestVueHiCode
      :content="contentTs"
      language="typescript"
      showIcon
      :ts-types-custom="[
        'VueUiXyConfig',
        'Test'
      ]"
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