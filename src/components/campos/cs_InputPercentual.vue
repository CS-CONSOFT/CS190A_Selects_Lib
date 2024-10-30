<template>
    <v-text-field v-model="formattedValue" ref="inputRef" variant="solo-filled" dense :clearable="prmLimpavel"
        color="primary" @input="onInput" @blur="onBlur" @focus="onFocus">
        <template v-slot:label>
            <span class="d-flex align-center"
                style="font-size: 12px; font-weight: 500; padding-bottom: 0.1em; color: #808080">
                {{ props.Prm_etiqueta }}<span v-if="props.Prm_isObrigatorio" class="text--red">*</span>
            </span>
        </template>
    </v-text-field>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue';

interface Props {
    Prm_etiqueta?: string;
    modelValue?: number;
    prmLimpavel?: boolean;
    Prm_isObrigatorio?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const localValue = ref<number>(props.modelValue ?? 0);
const formattedValue = ref<string>(formatValue(localValue.value));

// Função para formatar o valor como string com duas casas decimais
function formatValue(value: number) {
    return (value / 100).toFixed(2);
}

// Função para tratar a entrada e garantir que o valor fique entre 0,01 e 99,99
function onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = parseInt(input.value.replace(/\D/g, ''), 10); // Remove tudo que não é número
    if (isNaN(value)) value = 0;

    value = Math.min(Math.max(value, 1), 10000); // Limita o valor entre 1 e 9999 (equivalente a 0,01 a 99,99)
    localValue.value = value;
    formattedValue.value = formatValue(value);
    emit('update:modelValue', localValue.value / 100);
}

// Ao desfocar o campo, formata o valor corretamente
function onBlur() {
    formattedValue.value = formatValue(localValue.value);
}

// Ao focar no campo, remove a formatação
function onFocus() {
    formattedValue.value = localValue.value.toString();
}

watch(
    () => props.modelValue,
    (value) => {
        if (value !== undefined && value !== null) {
            localValue.value = Math.round(value * 100);
            formattedValue.value = formatValue(localValue.value);
        }
    }
);
</script>
