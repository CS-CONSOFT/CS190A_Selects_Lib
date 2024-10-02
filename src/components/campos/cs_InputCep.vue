<template>
    <v-text-field v-model="props.initialCep" label="CEP" @input="fetchCep" variant="solo-filled" :readonly="props.readonly">
        <template v-slot:label>
            <span class="d-flex align-center" style="font-size: 12px; font-weight: 500; padding-bottom: 0.1em; color: #808080">
                CEP <span v-if="props.Prm_isObrigatorio" class="text-error">*</span>
            </span>
        </template>
    </v-text-field>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, defineProps, defineEmits } from 'vue';
import { getCep } from '../../services/enderecamento/viacep';
import type { CEP } from '../../types/enderecamento/CepTypes';

const props = defineProps<{
    initialCep: number | null;
    readonly: boolean;
    Prm_isObrigatorio: boolean;
}>();

const emit = defineEmits<{
    (e: 'cep-info', info: CEP): void;
}>();

const cep = ref(props.initialCep);
const cepInfo = ref<CEP | null>(null);

const fetchCep = async () => {
    if (cep.value === 8) {
        try {
            const info = await getCep(cep.value);
            cepInfo.value = info;
            emit('cep-info', info);
        } catch (error) {
            console.error('Erro ao buscar informações do CEP:', error);
        }
    }
};

onMounted(() => {
    if (cep.value === 8) {
        fetchCep();
    }
});

watch(
    () => props.initialCep,
    (newCep) => {
        if (newCep && newCep === 8) {
            cep.value = newCep;
            fetchCep();
        }
    }
);
</script>
