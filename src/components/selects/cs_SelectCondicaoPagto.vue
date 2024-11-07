<template>
    <v-select
        v-model="internalSelectedCondicao"
        :items="formattedCondicoes"
        item-value="value"
        item-text="title"
        variant="solo-filled"
        hide-details
        @change="emitSelection"
    >
        <template v-slot:label>
            <span class="d-flex align-center" style="font-size: 12px; font-weight: 500; padding-bottom: 0.1em; color: #808080">
                {{ computedLabel }}<span v-if="props.Prm_isObrigatorio" class="text-error">*</span>
            </span>
        </template>
    </v-select>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { getUserFromLocalStorage } from '../../utils/getUserStorage';
import { getListCondicaoPagtoCombo } from '../../services/basico/combos/bb008_comboCondicaoPagto';
import type { Lista_bb008 } from '../../types/basico/condicao_de_pagamento/combos/Combo_CondicaoPagtoTypes';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const user = getUserFromLocalStorage();
const tenant = user?.TenantId;
const condicoes = ref<Lista_bb008[]>([]);
const internalSelectedCondicao = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione uma condição');

const formattedCondicoes = computed(() => {
    return [
        { title: '', value: '' },
        ...condicoes.value.map((item) => ({
            title: item.BB008_Condicao_Pagto,
            value: item.ID
        }))
    ];
});

const fetchCondicoesPagto = async () => {
    try {
        const response = await getListCondicaoPagtoCombo(tenant);
        if (response.status === 200) {
            condicoes.value = response.data.Lista_bb008;
            if (internalSelectedCondicao.value) {
                const selected = condicoes.value.find((condicao) => condicao.ID === internalSelectedCondicao.value);
                if (selected) {
                    internalSelectedCondicao.value = selected.ID;
                }
            }
        } else {
            console.error('Erro ao buscar os condições de pagamento:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os condições de pagamento:', error);
    }
};

onMounted(async () => {
    await fetchCondicoesPagto();
});

watch(internalSelectedCondicao, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedCondicao.value);
}
</script>
