<template>
    <ckeditor :editor="editor" v-model="editorData" @change="onChange" :config="editorConfig" />
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';
import { Ckeditor } from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const props = defineProps<{
    modelValue?: string;
    config?: any;
}>();

const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void;
    (event: 'change', eventData: any): void;
}>();

const editor = ref(ClassicEditor);
const editorData = ref(props.modelValue || '');

watch(
    () => props.modelValue,
    (newValue) => {
        editorData.value = newValue || '';
    }
);

function onChange(event: any) {
    emit('change', event);
}

watch(editorData, (newValue) => {
    emit('update:modelValue', newValue);
});

const editorConfig = ref(props.config || {});
</script>
