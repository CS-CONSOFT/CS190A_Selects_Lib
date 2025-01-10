<template>
    <v-select
        v-model="internalSelectedCargo"
        :items="cargos"
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
import { getUserFromLocalStorage } from '../../utils/getUserStorage';
import { getCombosBB } from '../../services/combos/bb_Combos';
import { ComboTypesBB } from '../../utils/enums/comboTypeBB';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const user = getUserFromLocalStorage();
const tenant = user?.TenantId;
const cargos = ref<{ title: string; value: string }[]>([]);
const internalSelectedCargo = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um cargo');

const fetchCargos = async () => {
    try {
        const response = await getCombosBB(tenant, ComboTypesBB.csicp_bb032);
        if (response.status === 200) {
            const fetchedData = response.data as unknown as { title: string; value: string }[];

            cargos.value = [{ title: '', value: '' }, ...fetchedData];

            if (internalSelectedCargo.value) {
                const selected = cargos.value.find((cargo) => cargo.value === internalSelectedCargo.value);
                if (selected) {
                    internalSelectedCargo.value = selected.value;
                }
            }
        } else {
            console.error('Erro ao buscar os cargos:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os cargos:', error);
    }
};

onMounted(async () => {
    await fetchCargos();
});

watch(internalSelectedCargo, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedCargo.value);
}
</script>
