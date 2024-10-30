<template>
    <v-text-field v-model="modelo" ref="inputRef" variant="solo-filled" dense :clearable="props.Prm_Limpavel"
        color="primary" :label="labelText" :placeholder="props.Prm_etiqueta" @input="handleInput"
        :value="formattedValue"></v-text-field>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import { useCurrencyInput, CurrencyDisplay } from 'vue-currency-input';

interface Props {
    Prm_etiqueta?: string;
    Prm_isObrigatorio?: boolean;
    Prm_Limpavel?: boolean;
    Prm_ValueMax?: number;
    Prm_Precision?: number;
}

const props = defineProps<Props>();

const modelo = ref<string>(''); // Usando string para permitir a entrada de múltiplos dígitos

const { setValue } = useCurrencyInput({
    currency: 'BRL',
    currencyDisplay: 'symbol' as CurrencyDisplay,
    hideCurrencySymbolOnFocus: false,
    hideGroupingSeparatorOnFocus: false,
    hideNegligibleDecimalDigitsOnFocus: false,
    autoDecimalDigits: false,
    useGrouping: true,
    accountingSign: false,
    precision: props.Prm_Precision ?? 2,
    valueRange: { min: 0, max: props.Prm_ValueMax ?? 99999.99 }
});

const labelText = computed(() => {
    return `${props.Prm_etiqueta} ${props.Prm_isObrigatorio ? '*' : ''}`;
});

// Computed property para formatar o valor corretamente para exibição
const formattedValue = computed(() => {
    const numericValue = modelo.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    if (numericValue.length === 0) return ''; // Retorna vazio se não houver valor
    // Formata como moeda
    const valueWithDecimals = (parseInt(numericValue) / 100).toFixed(2).replace('.', ',');
    return `R$ ${valueWithDecimals.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`; // Adiciona separadores de milhar
});

const handleInput = (value: string) => {
    modelo.value = value; // Atualiza o modelo com o valor do input
    const numericValue = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (numericValue.length > 0) {
        setValue(parseInt(numericValue) / 100); // Aplica o valor formatado
    } else {
        setValue(0); // Se não houver valor, define como 0
    }
};

onMounted(() => {
    if (modelo.value !== '') {
        const initialNumericValue = modelo.value.replace(/\D/g, '');
        setValue(parseInt(initialNumericValue) / 100); // Garante a formatação inicial
    }
});

watch(modelo, (value) => {
    const numericValue = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (numericValue.length > 0) {
        setValue(parseInt(numericValue) / 100);
    } else {
        setValue(0); // Se não houver valor, define como 0
    }
});
</script>
