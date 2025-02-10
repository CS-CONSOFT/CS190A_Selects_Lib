<template>
    <v-select
        v-model="internalSelectedAlmox"
        :items="almoxarifes"
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
import { getCombosGG } from '../../services/combos/gg_Combos';
import { ComboTypesGG } from '../../utils/enums/comboTypeGG';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const user = getUserFromLocalStorage();
const tenant = user?.TenantId;
const almoxarifes = ref<{ title: string; value: string }[]>([]);
const internalSelectedAlmox = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um almoxarife');

const fetchAlmoxarifes = async () => {
    try {
        const response = await getCombosGG(tenant, ComboTypesGG.csicp_gg001);
        if (response.status === 200) {
            const fetchedData = response.data as unknown as { title: string; value: string }[];

            almoxarifes.value = [{ title: '', value: '' }, ...fetchedData];

            if (internalSelectedAlmox.value) {
                const selected = almoxarifes.value.find((almoxarife) => almoxarife.value === internalSelectedAlmox.value);
                if (selected) {
                    internalSelectedAlmox.value = selected.value;
                }
            }
        } else {
            console.error('Erro ao buscar os almoxarifes:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os almoxarifes:', error);
    }
};

onMounted(async () => {
    await fetchAlmoxarifes();
});

watch(internalSelectedAlmox, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedAlmox.value);
}
</script>
