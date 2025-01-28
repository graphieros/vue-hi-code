declare module 'vue-hi-code' {
    import { DefineComponent } from "vue";

    export const VueHiCode: DefineComponent<{
        content: string
        language: 'javascript' | 'html'
        title?: string
        withCopy?: boolean
        withLineNumbers?: boolean
        copyIconColor?: string
        copyIconSize?: number
        copyIconStrokeWidth?: number
        borderRadius?: string
        padding?: string
        fontFamily?: string
        fontSize?: string
        titleFontSize?: string
        titleFontFamily?: string
        colorTitle?: string
        backgroundColor?: string
        baseTextColor?: string
        colorKeywords?: string
        colorVariableKeyword?: string
        colorFunction?: string
        colorNumber?: string
        colorString?: string
        colorParenthesis?: string
        colorPunctuation?: string
        colorBrackets?: string
        colorComment?: string
        colorHtmlTag?: string
        colorLineNumber?: string;
    }>
}