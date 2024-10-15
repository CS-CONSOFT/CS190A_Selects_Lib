<template>
    <v-text-field v-model="modelo" ref="inputRef" variant="solo-filled" dense :clearable="props.Prm_Limpavel" color="primary">
        <template v-slot:label>
            <span class="d-flex align-center" style="font-size: 12px; font-weight: 500; padding-bottom: 0.1em; color: #808080">
                {{ props.Prm_etiqueta }}<span v-if="props.Prm_isObrigatorio" class="text--red">*</span>
            </span>
        </template>
    </v-text-field>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useCurrencyInput, CurrencyDisplay } from 'vue-currency-input';

interface Props {
    Prm_etiqueta?: string;
    Prm_isObrigatorio?: boolean;
    Prm_Limpavel?: boolean;
    Prm_Moeda?: string;
    Prm_ValueMax?: number;
    Prm_Precision?: number;
}

const props = defineProps<Props>();

const modelo = ref<number | null>(null);

const { inputRef, setValue } = useCurrencyInput({
    currency: props.Prm_Moeda ?? 'BRL',
    currencyDisplay: 'hidden' as CurrencyDisplay,
    hideCurrencySymbolOnFocus: false,
    hideGroupingSeparatorOnFocus: false,
    hideNegligibleDecimalDigitsOnFocus: false,
    autoDecimalDigits: false,
    useGrouping: true,
    accountingSign: false,
    precision: props.Prm_Precision ?? 2,
    valueRange: { min: 0 }
});

onMounted(() => {
    if (modelo.value !== null) {
        setValue(modelo.value);
    }
});

watch(modelo, (value) => {
    if (value !== null) {
        setValue(value);
    }
});
</script>
