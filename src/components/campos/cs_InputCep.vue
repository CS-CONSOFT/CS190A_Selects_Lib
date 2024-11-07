<template>
    <v-text-field
        v-model="cep"
        label="CEP"
        @input="onInput"
        variant="solo-filled"
        :readonly="props.readonly"
        maxlength="9"
        placeholder="Digite somente números"
        v-mask="'#####-###'"
        :error-messages="cepError"
    >
        <template v-slot:label>
            <span class="d-flex align-center" style="font-size: 12px; font-weight: 500; padding-bottom: 0.1em; color: #808080">
                CEP
                <span v-if="props.Prm_isObrigatorio" class="text-error">*</span>
            </span>
        </template>
    </v-text-field>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, defineProps, defineEmits, nextTick } from 'vue';
import { mask } from 'vue-the-mask';
import { getCep } from '../../services/enderecamento/viacep';
import type { CEP } from '../../types/enderecamento/CepTypes';

const props = defineProps<{
    initialCep: string | number | null;
    readonly?: boolean;
    Prm_isObrigatorio: boolean;
}>();

const emit = defineEmits<{
    (e: 'cep-info', info: CEP): void;
}>();

const cep = ref<string>(props.initialCep?.toString() || '');
const cepError = ref<string | null>(null);

const onInput = async () => {
    const cepVal = cep.value.replace(/\D/g, '');

    cepError.value = null;

    if (cepVal.length === 8) {
        await fetchCep(cepVal);
    }
};

// Função para buscar o CEP
const fetchCep = async (cepVal: string) => {
    try {
        const numericCep = Number(cepVal);
        const info = await getCep(numericCep);
    } catch (error) {
        console.error('Erro ao buscar informações do CEP:', error);
        cepError.value = 'Erro ao buscar informações do CEP';
    }
};

onMounted(async () => {
    const initialCepVal = cep.value.replace(/\D/g, '');
    if (initialCepVal.length === 8) {
        await fetchCep(initialCepVal);
    }
});

watch(
    () => props.initialCep,
    async (newCep) => {
        const newCepStr = newCep?.toString() || '';
        const newCepVal = newCepStr.replace(/\D/g, '');

        if (newCepVal.length === 8) {
            cep.value = newCepStr;
            await nextTick();
            await fetchCep(newCepVal);
        }
    }
);
</script>
<script lang="ts">
export default {
    directives: {
        mask
    }
};
</script>
