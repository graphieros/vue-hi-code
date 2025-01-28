‹<script setup>
const props = defineProps({
    size: {
        type: Number,
        default: 24
    },
    stroke: {
        type: String,
        default: "#CCCCCC"
    },
    strokeWidth: {
        type: Number,
        default: 1.5
    },
});

</script>

<template>
    <svg viewBox="0 0 20 20" :height="size" :width="size" style="background:transparent">
        <path :stroke="stroke" :stroke-width="strokeWidth" fill="none" d="M 18 16 C 18 17 17 18 16 18 L 8 18 C 7 18 6 17 6 16 L 6 8 C 6 7 7 6 8 6 L 16 6 C 17 6 18 7 18 8 L 18 16 M 6 14 L 4 14 C 3 14 2 13 2 12 L 2 4 C 2 3 3 2 4 2 L 12 2 C 13 2 14 3 14 4 L 14 6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</template>