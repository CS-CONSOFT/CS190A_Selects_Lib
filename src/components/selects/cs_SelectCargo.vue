<template>
    <v-select
        v-model="internalSelectedCargo"
        :items="formattedCargo"
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
import { useAuthStore } from '../../stores/auth';
import { GetListCargosCombo } from '../../services/basico/combos/bb032_comboCargos';
import type { Lista_bb032 } from '../../types/basico/cargo/bb032_cargo';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const authStore = useAuthStore();
const tenant = authStore.user?.TenantId;
const cargos = ref<Lista_bb032[]>([]);
const internalSelectedCargo = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um cargo');

const formattedCargo = computed(() => {
    return cargos.value.map((item: { csicp_bb032: { BB032_Cargo: any; ID: any } }) => ({
        title: item.csicp_bb032.BB032_Cargo,
        value: item.csicp_bb032.ID
    }));
});

const fetchResponsaveis = async () => {
    try {
        const response = await GetListCargosCombo(tenant);
        if (response.status === 200) {
            cargos.value = response.data.Lista_bb032;
            if (internalSelectedCargo.value) {
                const selected = cargos.value.find(
                    (cargo: { csicp_bb032: { ID: string | null } }) => cargo.csicp_bb032.ID === internalSelectedCargo.value
                );
                if (selected) {
                    internalSelectedCargo.value = selected.csicp_bb032.ID;
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
    await fetchResponsaveis();
});

watch(internalSelectedCargo, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedCargo.value);
}
</script>
