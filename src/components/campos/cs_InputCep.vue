<template>
    <v-text-field
        v-model="cep"
        label="CEP"
        @input="fetchCep"
        variant="solo-filled"
        :readonly="props.readonly"
        maxlength="8"
        placeholder="Digite somente números"
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
import { ref, watch, onMounted, defineProps, defineEmits } from 'vue';
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

// Converte o CEP para string inicialmente
const cep = ref<string>(props.initialCep?.toString() || '');

// Função para buscar o CEP
const fetchCep = async () => {
    const cepVal = cep.value.replace(/\D/g, '');

    if (cepVal.length === 8) {
        try {
            const numericCep = Number(cepVal);
            const info = await getCep(numericCep);
            if (info) {
                emit('cep-info', info);
            }
        } catch (error) {
            console.error('Erro ao buscar informações do CEP:', error);
        }
    }
};

onMounted(() => {
    if (cep.value.length === 8) {
        fetchCep();
    }
});

watch(
    () => props.initialCep,
    (newCep) => {
        const newCepStr = newCep?.toString() || '';
        if (newCepStr.length === 8) {
            cep.value = newCepStr;
            fetchCep();
        }
    }
);
</script>
