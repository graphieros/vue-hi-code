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
    colorJsReserved: {
        type: String,
        default: 'rgb(78, 201, 176)'
    },
    colorComment: {
        type: String,
        default: '#8A8A8A'
    },
    colorHtmlTag: {
        type: String,
        default: '#559AD3'
    },
    colorError: {
        type: String,
        default: '#E46962'
    },
    // CSS
    colorCssSelector: {
        type: String,
        default: '#D7BA7D'
    },
});

const emit = defineEmits(['copy']);

const highlightedCode = computed(() => highlightCode(props.content, props.language));

function highlightCode(code, language) {
    if (language === 'html') {
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

        code = code.replace(/<!--[\s\S]*?-->/g, match => {
            return `<span class="code-comment">${match.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>`;
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

    } else if (['javascript', 'typescript'].includes(language)) {
        // 1) Temporarily replace angle brackets
        code = code.replace(/</g, '‹').replace(/>/g, '›');

        // 2) Define keyword lists
        const baseKeywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue', 'try', 'catch', 'throw', 'class', 'extends', 'import', 'export', 'default', 'new', 'async', 'await'];
        const tsKeywords = ['type', 'interface', 'enum', 'implements', 'public', 'private', 'protected', 'readonly', 'abstract', 'namespace', 'declare', 'module', 'from', 'as', 'keyof', 'infer', 'instanceof', 'typeof', 'never', 'unknown', 'any', 'void', 'boolean', 'number', 'string', 'symbol', 'bigint'];
        const allKeywords = Array.from(new Set([...baseKeywords, ...(language === 'typescript' ? tsKeywords : [])]));
        const keywordsPattern = new RegExp(`\\b(?:${allKeywords.join('|')})\\b`, 'g');
        const functionNamePattern = /\b([a-zA-Z_][\w]*)\s*(?=\()/g;
        const stringPattern = /(["'`])(?:(?=(\\?))\2.)*?\1/g;
        const commentPattern = /(\/\*[\s\S]*?\*\/|\/\/.*)/g;
        const variablePattern = /(?<!["'`])\\b(?:const|let|var)\\b\s+([a-zA-Z_$][\w$]*)(?!["'`])(?=(?:[^"'`]*["'`][^"'`]*["'`])*[^"'`]*)/g;
        const numberPattern = /\\b\d+(\.\d+)?\\b/g;

        // 3) Extract placeholders
        const placeholders = { keys: [], vars: [], strs: [], comms: [], nums: [] };
        let tmp = code
            .replace(variablePattern, (m, v) => { placeholders.keys.push(m.split(' ')[0]); placeholders.vars.push(v); return `__KEYWORD_PLACEHOLDER_${placeholders.keys.length - 1}__ ${v}`; })
            .replace(stringPattern, m => { placeholders.strs.push(m); return `__STRING_PLACEHOLDER_${placeholders.strs.length - 1}__`; })
            .replace(commentPattern, m => { placeholders.comms.push(m); return `__COMMENT_PLACEHOLDER_${placeholders.comms.length - 1}__`; })
            .replace(numberPattern, m => { placeholders.nums.push(m); return `__NUMBER_PLACEHOLDER_${placeholders.nums.length - 1}__`; });

        // 4) Highlight keywords & function calls
        tmp = tmp
            .replace(keywordsPattern, '<span class="code-keyword">$&</span>')
            .replace(functionNamePattern, '<span class="code-function">$1</span>');

        // 5) Restore placeholders & punctuations
        tmp = tmp
            .replace(/__COMMENT_PLACEHOLDER_(\d+)__/g, (_, i) => `<span class="code-comment">${placeholders.comms[i]}</span>`)
            .replace(/__STRING_PLACEHOLDER_(\d+)__/g, (_, i) => `<span class="code-string">${placeholders.strs[i]}</span>`)
            .replace(/__KEYWORD_PLACEHOLDER_(\d+)__/g, (_, i) => `<span class="code-variable-keyword">${placeholders.keys[i]}</span>`)
            .replace(/__NUMBER_PLACEHOLDER_(\d+)__/g, (_, i) => `<span class="code-number">${placeholders.nums[i]}</span>`)
            .replace(/\(/g, `<span class="code-parens">(</span>`)
            .replace(/\)/g, `<span class="code-parens">)</span>`)
            .replace(/\{/g, `<span class="code-parens">{</span>`)
            .replace(/\}/g, `<span class="code-parens">}</span>`)
            .replace(/\[/g, `<span class="code-brackets">[</span>`)
            .replace(/\]/g, `<span class="code-brackets">]</span>`)
            .replace(/;/g, `<span class="code-punctuation">;</span>`)
            .replace(/\./g, `<span class="code-punctuation">.</span>`)
            .replace(/,/g, `<span class="code-punctuation">,</span>`);

        // 6) Restore generics-only angle brackets
        // Opening: only ‹ before identifier, not "<=", not "=>"
        tmp = tmp.replace(/‹(?=[A-Za-z_$])/g, `<span class="code-brackets">&lt;</span>`);
        // Closing: only › after identifier, not ">=", not "=>"
        tmp = tmp.replace(/(?<=[A-Za-z0-9_$])›/g, `<span class="code-brackets">&gt;</span>`);
        // 7) Fallback for any remaining standalone delimiters (comparisons, arrows)
        tmp = tmp.replace(/‹/g, `<span class="code-punctuation">&lt;</span>`)
            .replace(/›/g, `<span class="code-punctuation">&gt;</span>`);

        // 8) Highlight reserved globals
        const reservedPattern = /\b(?:Array|String|RegExp|Date|Promise|Map|Set|WeakMap|WeakSet|Symbol|Math|JSON|Reflect|Proxy)\b/g;
        tmp = tmp.replace(reservedPattern, '<span class="code-js-reserved">$&</span>');

        code = tmp;
    } else if (language === 'error') {
        code = `<div class="code-error">${code}</div>`;
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
                '--color-js-reserved': colorJsReserved,
                '--color-variable-keyword': colorVariableKeyword,
                '--font-family': fontFamily,
                '--font-size': fontSize,
                '--line-height': lineHeight,
                '--padding': padding,
                '--title-font-family': titleFontFamily,
                '--title-font-size': titleFontSize,
                // CSS
                '--color-css-selector': colorCssSelector,
            }"
        />
        <div v-if="language === 'error'" class="error-wrapper" :style="{
            '--color-error': colorError,
            '--border-radius': borderRadius
        }" />
    </code>
</template>

<style scoped>
.code-wrapper {
    position: relative;
    display: block;
}

.code-copy {
    align-items: center;
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
    overflow-y: hidden;
    overflow: auto;
    padding: var(--padding);
    white-space: pre-wrap;
    word-wrap: break-word;
    line-height: var(--line-height);
}

.error-wrapper {
    background: var(--color-error);
    border-radius: var(--border-radius);
    display: block;
    height: 100%;
    left: 0;
    opacity: 0.2;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 100%;
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
::v-deep(.code-string) {
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

::v-deep(.code-js-reserved) {
    color: var(--color-js-reserved);
}

/* Comments */
::v-deep(.code-comment) {
    color: var(--color-comment);
    font-style: italic;
}

::v-deep(.code-comment) * {
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
    font-style: normal;
    margin-right: 0.5em;
    text-align: right;
    width: 3ch;
}
</style>
