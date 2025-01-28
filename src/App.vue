<script setup>
// PLAYGROUND

import { ref } from "vue";

import TestVueHiCode from "./components/vue-hi-code.vue";

const contentJs = ref(`const bar = 123;
// Some comment
const baz = "let me const do var";
const c = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
defineEmits();

/*
* Some other comment
*/
function foo() {
  return bar;
}

for(let i = 0; i < 10; i += 1) {
  dude.push(x + i)
}

console.log(test[0])

`)

const contentHTML = ref(`<div class="test">content</div>`)

</script>

<template>
  <main>
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

    >
    </TestVueHiCode>
    <TestVueHiCode
      :content="contentHTML"
      language="html"
    />
    <VueHiCode 
      with-copy
      :with-line-numbers="false"
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
    />
  </main>
</template>