<template>
    <v-select v-model="selectedAlmox" :items="formattedAlmoxarifes" item-value="value" item-text="title" variant="solo-filled" hide-details>
        <template v-slot:label>
            <span class="d-flex align-center" style="font-size: 12px; font-weight: 500; padding-bottom: 0.1em; color: #808080">
                {{ computedLabel }}<span v-if="props.Prm_isObrigatorio" class="text-error">*</span>
            </span>
        </template>
    </v-select>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { getUserFromLocalStorage } from '../../utils/getUserStorage';
import { getListAlmoxarifesCombo } from '../../services/materiais/combos/gg001_comboAlmoxarifes';
import type { Csicp_gg001 } from '../../types/materiais/combos/Combo_AlmoxarifeTypes';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const user = getUserFromLocalStorage();
const tenant = user?.TenantId;
const almoxarifes = ref<Csicp_gg001[]>([]);
const selectedAlmox = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um almoxarifado');

const formattedAlmoxarifes = computed(() => {
    return [
        { title: '', value: '' },
        ...almoxarifes.value.map((item) => ({
            title: `${item.GG001_CodigoAlmox} - ${item.GG001_DescAlmox}`,
            value: item.Id
        }))
    ];
});

const fetchAlmoxarifes = async () => {
    try {
        const response = await getListAlmoxarifesCombo(tenant);
        if (response.status === 200) {
            almoxarifes.value = response.data.Almoxarifados;
        } else {
            console.error('Erro ao buscar almoxarifados:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao carregar almoxarifados:', error);
    }
};

watch(selectedAlmox, (newValue) => {
    emit('update:modelValue', newValue);
});

onMounted(() => {
    fetchAlmoxarifes();
});
</script>
