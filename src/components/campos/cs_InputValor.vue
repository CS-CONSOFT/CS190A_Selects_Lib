<template>
    <v-text-field
        v-model="formattedValue"
        variant="solo-filled"
        dense
        :clearable="props.Prm_Limpavel"
        :rules="validationRules"
        color="primary"
        @input="handleInput"
    >
        <template v-slot:label>
            <span class="d-flex align-center" style="font-size: 12px; font-weight: 500; padding-bottom: 0.2em; color: #808080">
                {{ computedLabel }}<span v-if="props.Prm_isObrigatorio" class="text-error">*</span>
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
    modelValue?: number | string;
}

// Definição das props
const props = defineProps<Props>();

// Define os eventos emitidos
const emit = defineEmits(['update:modelValue', 'clean-value']);

// Estado interno do valor numérico
const numericValue = ref<any>(null);

// Reatividade para o valor formatado
const formattedValue = computed({
    get() {
        if (numericValue.value === null) return '';
        return new Intl.NumberFormat('pt-BR', {
            style: 'decimal',
            minimumFractionDigits: props.Prm_Precision ?? 2,
            maximumFractionDigits: props.Prm_Precision ?? 2
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

// Validação das regras
const validationRules = computed(() => {
    const rules = [];
    if (props.Prm_isObrigatorio) {
        rules.push((v: string) => !!v || 'Este campo é obrigatório');
    }
    return rules;
});

const computedLabel = computed(() => props.Prm_etiqueta || 'Valor');

// Trata a entrada do usuário
function handleInput(event: InputEvent) {
    const target = event.target as HTMLInputElement;

    // Atualiza diretamente o valor do campo
    formattedValue.value = target.value;
}

// Watcher para sincronizar mudanças no v-model do pai
watch(
    () => numericValue.value,
    (newValue) => {
        emit('update:modelValue', newValue); // Emite o valor limpo (número bruto)
        emit('clean-value', newValue); // Emite o valor limpo para o pai
    }
);

// Watcher para detectar alterações no v-model vindo do pai (ex. preenchido pela API)
watch(
    () => props.modelValue,
    (newValue) => {
        if (typeof newValue === 'string') {
            // Remove pontos do valor antes de processar
            const cleanedValue = newValue.replace(/\./g, '');
            numericValue.value = cleanedValue ? parseFloat(cleanedValue) : null;
        } else {
            numericValue.value = newValue; // Atualiza diretamente se for numérico
        }
    },
    { immediate: true } // Garante a execução inicial
);
</script>
