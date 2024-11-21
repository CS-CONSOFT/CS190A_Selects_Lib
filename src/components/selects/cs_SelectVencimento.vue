<template>
    <v-select
        v-model="internalSelectedVencimento"
        :items="formattedVencimento"
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
import { GetListVencimentoCombo } from '../../services/basico/combos/bb037_comboVencimento';
import type { Csicp_bb037, Lista_bb037 } from '../../types/basico/vencimento/bb037_vencimento';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const user = getUserFromLocalStorage();
const tenant = user?.TenantId;
const vencimentos = ref<Lista_bb037[]>([]);
const internalSelectedVencimento = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione uma data de vencimento');

const formattedVencimento = computed(() => {
    return [
        { title: '', value: '' },
        ...vencimentos.value.map((item) => ({
            title: item.csicp_bb037.bb037_Dia,
            value: item.csicp_bb037.Id
        }))
    ];
});

const fetchVencimento = async () => {
    try {
        const response = await GetListVencimentoCombo(tenant);
        if (response.status === 200) {
            vencimentos.value = response.data.Lista_bb037;
            if (internalSelectedVencimento.value) {
                const selected = vencimentos.value.find((vencimento) => vencimento.csicp_bb037.Id === internalSelectedVencimento.value);
                if (selected) {
                    internalSelectedVencimento.value = selected.csicp_bb037.Id;
                }
            }
        } else {
            console.error('Erro ao buscar as datas de vencimento:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar as datas de vencimento:', error);
    }
};

onMounted(async () => {
    await fetchVencimento();
});

watch(internalSelectedVencimento, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedVencimento.value);
}
</script>
