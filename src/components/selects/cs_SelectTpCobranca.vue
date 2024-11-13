<template>
    <v-select
        v-model="internalSelectedCobranca"
        :items="formattedCobranca"
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
import { GetListTpCobrancaCombo } from '@/services/basico/combos/bb009_comboTpCobranca';
import type { Lista_bb009 } from '@/types/basico/tipo_de_cobranca/bb009_TpCobranca';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const user = getUserFromLocalStorage();
const tenant = user?.TenantId;
const cobranca = ref<Lista_bb009[]>([]);
const internalSelectedCobranca = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um tipo de cobrança');

const formattedCobranca = computed(() => {
    return [
        { title: '', value: '' },
        ...cobranca.value.map((item) => ({
            title: item.BB009_TipoCobranca,
            value: item.ID
        }))
    ];
});

const fetchTpCobranca = async () => {
    try {
        const response = await GetListTpCobrancaCombo(tenant);
        if (response.status === 200) {
            cobranca.value = response.data.Lista_bb009;
            if (internalSelectedCobranca.value) {
                const selected = cobranca.value.find((cobranca) => cobranca.ID === internalSelectedCobranca.value);
                if (selected) {
                    internalSelectedCobranca.value = selected.ID;
                }
            }
        } else {
            console.error('Erro ao buscar os tipos de cobrança:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os tipos de cobrança:', error);
    }
};

onMounted(async () => {
    await fetchTpCobranca();
});

watch(internalSelectedCobranca, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedCobranca.value);
}
</script>
