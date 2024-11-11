<template>
    <v-snackbar v-model="isVisible" :timeout="timeout" :color="snackbarColor" top multi-line>
        {{ message }}
        <template v-slot:actions>
            <v-btn color="white" icon="mdi-close" @click="closeSnackbar"></v-btn>
        </template>
    </v-snackbar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    snackbarColor: {
        type: String,
        default: 'success'
    },
    timeout: {
        type: Number,
        default: 3000
    }
});

const emit = defineEmits(['update:modelValue']);
const isVisible = ref(props.modelValue);

// Atualiza o estado do snackbar quando a prop modelValue muda
watch(
    () => props.modelValue,
    (newVal) => {
        isVisible.value = newVal;
    }
);

// Fechar o snackbar e emitir o evento para atualizar a prop modelValue
function closeSnackbar() {
    isVisible.value = false;
    emit('update:modelValue', false);
}
</script>

<style scoped>
/* Estilos adicionais, se necessário */
</style>
