<script setup>
// PLAYGROUND

import { ref } from "vue";

import TestVueHiCode from "./components/vue-hi-code.vue";

const contentJs = ref(`// Not all comments are bad
async function copyCode() {
    try {
        await navigator.clipboard.writeText(props.content);
        emit('copy', props.content);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}`)

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