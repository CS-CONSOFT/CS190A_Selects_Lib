<template>
    <v-select
        v-model="internalSelectedForma"
        :items="formattedFormas"
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
import { ref, computed, defineEmits, onMounted, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { getListFormaPagtoCombo } from '@/services/basico/combos/bb026_comboFormaPagto';
import type { Csicp_bb026 } from '@/types/basico/forma_de_pagamento/combos/Combo_FormaPagto';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const authStore = useAuthStore();
const tenant = authStore.user?.TenantId;
const formas = ref<Csicp_bb026[]>([]);
const internalSelectedForma = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione uma condição');

const formattedFormas = computed(() => {
    return formas.value.map((item) => ({
        title: item.BB026_FormaPagamento,
        value: item.ID
    }));
});

const fetchFormasPagto = async () => {
    try {
        const response = await getListFormaPagtoCombo(tenant);
        if (response.status === 200) {
            formas.value = response.data.Csicp_bb026;
            if (internalSelectedForma.value) {
                const selected = formas.value.find((condicao) => condicao.ID === internalSelectedForma.value);
                if (selected) {
                    internalSelectedForma.value = selected.ID;
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
    await fetchFormasPagto();
});

watch(internalSelectedForma, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedForma.value);
}
</script>
