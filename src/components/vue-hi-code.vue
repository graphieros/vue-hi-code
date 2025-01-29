<script setup>
import { computed } from 'vue';
import IconCopy from "./IconCopy.vue";

const props = defineProps({
    content: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: ''
    },
    // LINE NUMBERS
    withLineNumbers: {
        type: Boolean,
        default: false
    },
    colorLineNumber: {
        type: String,
        default: '#8A8A8A'
    },
    // COPY
    withCopy: {
        type: Boolean,
        default: true,
    },
    copyIconColor: {
        type: String,
        default: '#CCCCCC',
    },
    copyIconSize: {
        type: Number,
        default: 20,
    },
    copyIconStrokeWidth: {
        type: Number,
        default: 1.5
    },
    // STYLES
    borderRadius: {
        type: String,
        default: '0.3rem'
    },
    padding: {
        type: String,
        default: '1rem'
    },
    lineHeight: {
        type: String,
        default: '1.4rem'
    },
    // FONTS
    fontFamily: {
        type: String,
        default: "'Fira Code', monospace"
    },
    fontSize: {
        type: String,
        default: '1rem'
    },
    titleFontSize: {
        type: String,
        default: '1rem',
    },
    // COLORS
    titleFontFamily: {
        type: String,
        default: 'Verdana, Geneva, Tahoma, sans-serif'
    },
    colorTitle: {
        type: String,
        default: '#E1E5E8'
    },
    backgroundColor: {
        type: String,
        default: '#2A2A2A'
    },
    baseTextColor: {
        type: String,
        default: '#CCCCCC'
    },
    colorKeywords: {
        type: String,
        default: '#B37BAE'
    },
    colorVariableKeyword: {
        type: String,
        default: '#559AD3'
    },
    colorFunction: {
        type: String,
        default: '#DCDCAA'
    },
    colorNumber: {
        type: String,
        default: '#AEC6A1'
    },
    colorString: {
        type: String,
        default: '#CD9077'
    },
    colorParenthesis: {
        type: String,
        default: "#8A8A8A"
    },
    colorPunctuation: {
        type: String,
        default: '#E1E5E8'
    },
    colorBrackets: {
        type: String,
        default: '#559AD3'
    },
    colorComment: {
        type: String,
        default: '#8A8A8A'
    },
    colorHtmlTag: {
        type: String,
        default: '#559AD3'
    },
    // CSS
    colorCssSelector: {
        type: String,
        default: '#D7BA7D'
    }
});

const emit = defineEmits(['copy']);

const highlightedCode = computed(() => highlightCode(props.content, props.language));

function highlightCode(code, language) {
    if (language === 'html') {
        // Very basic html parsing for now

        const htmlTagPattern = /(<\/?)([a-zA-Z0-9-]+)([^<]*?)(\/?>)/g;
        code = code.replace(htmlTagPattern, (_, openingBracket, tagName, attributes, closingBracket) => {
            const highlightedTagName = `<span class="code-tag-name">${tagName}</span>`;
            return (
                `&lt;${openingBracket === '</' ? '/' : ''}` +
                highlightedTagName +
                attributes +
                `${closingBracket === '/>' ? ' /' : ''}&gt;`
            );
        });
    } else if (language === "css") {
        code = code
        // Comments
        .replace(/\/\*[\s\S]*?\*\//g, '<span class="code-comment">$&</span>')

        // Selectors after closing braces
        .replace(/(?<=\}[\s]*)\/*([\s\S]*?)(?=\{)/g, (_, selector) => {
            // Selectors found in between } and { with span class="selector"
            return `\n<span class="selector">${selector.trim()} </span>`;
        })

        // Selectors that appear at the beginning of the CSS
        .replace(/^([^\{]+)\s*(?=\{)/g, (_, selector) => {
            return `<span class="selector">${selector.trim()} </span>`;
        })

        // Insert line breaks between closing braces and next selector
        .replace(/<\/span>\s*(?=\w)/g, '</span>\n')

    } else if (language === 'javascript') {
        const keywords = /\b(?:const|let|var|function|return|if|else|for|while|switch|case|break|continue|try|catch|throw|class|extends|import|export|default|new|async|await)\b/g;

        const functionNamePattern = /\b([a-zA-Z_]\w*)\s*(?=\()/g;
        const stringPattern = /(["'])(?:(?=(\\?))\2.)*?\1/g;
        const commentPattern = /(\/\*[\s\S]*?\*\/|\/\/.*)/g;
        const variablePattern = /(?<!["'`])\b(?:const|let|var)\b\s+([a-zA-Z_$][\w$]*)(?!["'`])(?=(?:[^"'`]*["'`][^"'`]*["'`])*[^"'`]*$)/g;
        const numberPattern = /\b\d+(\.\d+)?\b/g;

        const variablePlaceholders = [];
        const keywordPlaceholders = [];

        const codeWithVariables = code.replace(variablePattern, (match, variableName) => {
            const keyword = match.split(' ')[0];
            variablePlaceholders.push(variableName);
            keywordPlaceholders.push(keyword);

            return `__KEYWORD_PLACEHOLDER_${keywordPlaceholders.length - 1}__ ${variableName}`;
        });

        const stringPlaceholders = [];
        const codeWithStrings =  codeWithVariables.replace(stringPattern, (match) => {
            stringPlaceholders.push(match);
            return `__STRING_PLACEHOLDER_${stringPlaceholders.length - 1}__`;
        });

        const commentPlaceholders = [];
        const codeWithComments = codeWithStrings.replace(commentPattern, (match) => {
            commentPlaceholders.push(match);
            return `__COMMENT_PLACEHOLDER_${commentPlaceholders.length - 1}__`;
        });

        const numberPlaceholders = [];
        const codeWithNumbers = codeWithComments.replace(numberPattern, (match) => {
            numberPlaceholders.push(match);
            return `__NUMBER_PLACEHOLDER_${numberPlaceholders.length - 1}__`;
        });

        code = codeWithNumbers
            .replace(keywords, '<span class="code-keyword">$&</span>')
            .replace(functionNamePattern, '<span class="code-function">$1</span>')

        code = code.replace(/__COMMENT_PLACEHOLDER_(\d+)__/g, (_, index) => {
            const comment = commentPlaceholders[index];
            return `<span class="code-comment">${comment}</span>`;
        });

        code = code.replace(/__STRING_PLACEHOLDER_(\d+)__/g, (_, index) => {
            const string = stringPlaceholders[index];
            return `<span class="code-string">${string}</span>`;
        });

        code = code.replace(/__KEYWORD_PLACEHOLDER_(\d+)__/g, (_, index) => {
            const keyword = keywordPlaceholders[index];
            return `<span class="code-variable-keyword">${keyword}</span>`;
        });

        code = code.replace(/__NUMBER_PLACEHOLDER_(\d+)__/g, (_, index) => {
            const number = numberPlaceholders[index];
            return `<span class="code-number">${number}</span>`;
        });

        code = code.replaceAll('(', `<span class="code-parens">(</span>`);
        code = code.replaceAll(')', `<span class="code-parens">)</span>`);
        code = code.replaceAll('{', `<span class="code-parens">{</span>`);
        code = code.replaceAll('}', `<span class="code-parens">}</span>`);

        code = code.replaceAll('[', `<span class="code-brackets">[</span>`);
        code = code.replaceAll(']', `<span class="code-brackets">]</span>`);

        code = code.replaceAll(';', `<span class="code-punctuation">;</span>`);
        code = code.replaceAll('.', `<span class="code-punctuation">.</span>`);
        code = code.replaceAll(',', `<span class="code-punctuation">,</span>`);
    }

    let codeWithTitle = code;

    if (props.title) {
        codeWithTitle = `<div class="code-title">${props.title}</div>\n${code}`;
    }

    if (props.withLineNumbers) {
        const lines = codeWithTitle.split("\n");
        codeWithTitle = lines
            .map((line, index) => {
                if (props.title && index === 0) {
                    return line
                }
                return `<span class="code-line-number">${index + (props.title ? 0 : 1)}</span> ${line}`
            })
            .join("\n");
    }

    return {
        code,
        codeWithTitle
    };
}

async function copyCode() {
    try {
        await navigator.clipboard.writeText(props.content);
        emit('copy', props.content);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}
</script>

<template>
    <code class="code-wrapper">
        <button 
            v-if="withCopy" class="code-copy"
            @click="copyCode"
            :aria-label="'Copy code: ' + props.title"
        >
            <IconCopy
                :stroke="copyIconColor"
                :size="copyIconSize"
                :stroke-width="copyIconStrokeWidth"
            />
        </button>
        <pre 
            v-html="highlightedCode.codeWithTitle" 
            class="code-container"
            ref="codeContent"
            :style="{
                '--background-color': backgroundColor,
                '--base-text-color': baseTextColor,
                '--border-radius': borderRadius,
                '--color-brackets': colorBrackets,
                '--color-comment': colorComment,
                '--color-function': colorFunction,
                '--color-html-tag': colorHtmlTag,
                '--color-keywords': colorKeywords,
                '--color-line-number': colorLineNumber,
                '--color-number': colorNumber,
                '--color-parenthesis': colorParenthesis,
                '--color-punctuation': colorPunctuation,
                '--color-string': colorString,
                '--color-title': colorTitle,
                '--color-variable-keyword': colorVariableKeyword,
                '--font-family': fontFamily,
                '--font-size': fontSize,
                '--line-height': lineHeight,
                '--padding': padding,
                '--title-font-family': titleFontFamily,
                '--title-font-size': titleFontSize,
                //CSS
                '--color-css-selector': colorCssSelector
            }"
        />
    </code>
</template>

<style scoped>
.code-wrapper {
    position: relative;
    display: block;
}

.code-copy {
    align-items:center;
    background: transparent;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 0.3rem;
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
}

.code-copy:hover {
    background: #FFFFFF10;
    box-shadow: 0 6px 12px #1A1A1A80;
}

.code-container {
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    color: var(--base-text-color);
    font-family: var(--font-family);
    font-size: var(--font-size);
    overflow-x: auto;
    overflow-y:hidden;
    overflow: auto;
    padding: var(--padding);
    white-space: pre-wrap;
    word-wrap: break-word;
    line-height: var(--line-height);
}

::v-deep(.code-title) {
    border-bottom: 1px solid grey;
    color: var(--color-title);
    font-family: var(--title-font-family);
    font-size: var(--title-font-size);
    padding: 0.5rem 0 1rem 0;
}

/* Keyword Styles */
::v-deep(.code-keyword) {
    color: var(--color-keywords);
}

/* Variable keyword Styles */
::v-deep(.code-variable-keyword) {
    color: var(--color-variable-keyword);
}

/* Function names */
::v-deep(.code-function) {
    color: var(--color-function);
}

::v-deep(.code-number) {
    color: var(--color-number);
}

/* Strings */
::v-deep(.code-string){
    color: var(--color-string);
}

::v-deep(.code-string) * {
    color: var(--color-string) !important;
}

/* Parenthesis */
::v-deep(.code-parens) {
    color: var(--color-parenthesis);
}
/* Commas, semicolons, colons */
::v-deep(.code-punctuation) {
    color: var(--color-punctuation);
}

/* Commas, semicolons, colons */
::v-deep(.code-punctuation) {
    color: var(--color-punctuation);
}

/* Brackets */
::v-deep(.code-brackets) {
    color: var(--color-brackets);
}

/* Comments */
::v-deep(.code-comment) {
    color: var(--color-comment);
    font-style: italic;
}
::v-deep(.code-comment) *{
    color: var(--color-comment) !important;
}

/* HTML Tag Names */
::v-deep(.code-tag-name) {
    color: var(--color-html-tag);
}

/* CSS selectors */
::v-deep(.selector) {
    color: var(--color-css-selector);
}

::v-deep(.code-line-number) {
    color: var(--color-line-number);
    display: inline-block;
    font-size: 0.8rem;
    font-style:normal;
    margin-right: 0.5em;
    text-align: right;
    width: 3ch;
}

</style>
