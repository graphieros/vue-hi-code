declare module 'vue-hi-code' {
    import { DefineComponent } from "vue";

    export const VueHiCode: DefineComponent<{
        backgroundColor?: string
        baseTextColor?: string
        borderRadius?: string
        colorBrackets?: string
        colorComment?: string
        colorCssSelector?: string;
        colorFunction?: string
        colorHtmlTag?: string
        colorKeywords?: string
        colorLineNumber?: string;
        colorNumber?: string
        colorParenthesis?: string
        colorPunctuation?: string
        colorString?: string
        colorTitle?: string
        colorVariableKeyword?: string
        content: string
        copyIconColor?: string
        copyIconSize?: number
        copyIconStrokeWidth?: number
        fontFamily?: string
        fontSize?: string
        language: 'javascript' | 'html' | 'css'
        lineHeight?: string;
        padding?: string
        title?: string
        titleFontFamily?: string
        titleFontSize?: string
        withCopy?: boolean
        withLineNumbers?: boolean
    }>
}