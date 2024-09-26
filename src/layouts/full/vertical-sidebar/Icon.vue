<template>
    <v-icon :icon="item" :size="level > 0 ? 14 : 20"></v-icon>
</template>

<script setup>
const props = defineProps({
    item: String,
    level: Number
});
</script>
