<template>
    <v-select
        v-model="internalSelectedCentroDeCusto"
        :items="formattedCentroDeCusto"
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
import { GetListCentroDeCustoCombo } from '../../services/basico/combos/bb005_comboCentroDeCusto';
import type { Lista_bb005 } from '../../types/basico/centro_de_custo/combo/Combo_CentroDeCustoTypes';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const user = getUserFromLocalStorage();
const tenant = user?.TenantId;
const centros = ref<Lista_bb005[]>([]);
const internalSelectedCentroDeCusto = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um centro de custo');

const formattedCentroDeCusto = computed(() => {
    return [
        { title: '', value: '' },
        ...centros.value.map((item) => ({
            title: item.csicp_bb005.BB005_NomeCCusto,
            value: item.csicp_bb005.ID
        }))
    ];
});

const fetchCentroDeCusto = async () => {
    try {
        const response = await GetListCentroDeCustoCombo(tenant);
        if (response.status === 200) {
            centros.value = response.data.Lista_bb005;
            if (internalSelectedCentroDeCusto.value) {
                const selected = centros.value.find((centro) => centro.csicp_bb005.ID === internalSelectedCentroDeCusto.value);
                if (selected) {
                    internalSelectedCentroDeCusto.value = selected.csicp_bb005.ID;
                }
            }
        } else {
            console.error('Erro ao buscar centros de custo:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os centros de custo:', error);
    }
};

onMounted(async () => {
    await fetchCentroDeCusto();
});

watch(internalSelectedCentroDeCusto, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedCentroDeCusto.value);
}
</script>
