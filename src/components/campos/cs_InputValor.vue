<template>
    <v-text-field
        v-model="formattedValue"
        variant="solo-filled"
        dense
        :clearable="props.Prm_Limpavel"
        color="primary"
        :label="labelText"
        @input="handleInput"
    >
        <template v-slot:label>
            <span class="d-flex align-center" style="font-size: 12px; font-weight: 500; padding-bottom: 0.2em; color: #808080">
                {{ props.Prm_etiqueta }}<span v-if="props.Prm_isObrigatorio" class="text-error">*</span>
            </span>
        </template>
    </v-text-field>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';

interface Props {
    Prm_etiqueta?: string;
    Prm_isObrigatorio?: boolean;
    Prm_Limpavel?: boolean;
    Prm_ValueMax?: number;
    Prm_Precision?: number;
}

// Definição das props
const props = defineProps<Props>();

// Define os eventos emitidos
const emit = defineEmits(['update:modelValue']);

// Estado interno do valor numérico
const numericValue = ref<number | null>(null);

// Rótulo do campo com indicação obrigatória
const labelText = computed(() => {
    return `${props.Prm_etiqueta || ''} ${props.Prm_isObrigatorio ? '*' : ''}`;
});

// Valor formatado para exibição no campo
const formattedValue = computed({
    get() {
        if (numericValue.value === null) return '';
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: props.Prm_Precision ?? 2
        }).format(numericValue.value);
    },
    set(value: string) {
        const onlyNumbers = value.replace(/\D/g, ''); // Remove caracteres não numéricos
        const precision = props.Prm_Precision ?? 2;

        // Calcula o valor numérico com base na precisão
        numericValue.value = onlyNumbers ? parseInt(onlyNumbers, 10) / Math.pow(10, precision) : null;

        // Aplica limite máximo, se necessário
        if (numericValue.value !== null && props.Prm_ValueMax && numericValue.value > props.Prm_ValueMax) {
            numericValue.value = props.Prm_ValueMax;
        }
    }
});

// Trata a entrada do usuário
function handleInput(event: InputEvent) {
    const target = event.target as HTMLInputElement;

    // Atualiza diretamente o valor do campo
    formattedValue.value = target.value;
}

// Valor bruto para envio à API
const rawValue = computed(() => numericValue.value ?? 0);

// Watcher para sincronizar com o pai
watch(
    formattedValue,
    (newValue) => {
        emit('update:modelValue', newValue); // Emite o valor formatado (bruto) para o componente pai
    },
    { immediate: true }
);
</script>
