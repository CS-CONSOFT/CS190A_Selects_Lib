<template>
    <v-select
        v-model="internalSelectedAdministradora"
        :items="formattedAdministradoras"
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
import { GetAdministradoraCompleto } from '../../services/basico/bb019_administradora';
import type { Lista_bb019_Completo } from '../../types/basico/administradora/bb019_administradora';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const user = getUserFromLocalStorage();
const tenant = user?.TenantId;
const administradoras = ref<Lista_bb019_Completo[]>([]);
const internalSelectedAdministradora = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione uma administradora');

const formattedAdministradoras = computed(() => {
    return administradoras.value.map((item) => ({
        title: item.csicp_bb019.BB019_Administradora,
        value: item.csicp_bb019.ID
    }));
});

const fetchAdministradoras = async () => {
    try {
        const response = await GetAdministradoraCompleto(tenant, true, false, '', 1, 999);
        if (response.status === 200) {
            administradoras.value = response.data.Lista_bb019_Completo;
            if (internalSelectedAdministradora.value) {
                const selected = administradoras.value.find(
                    (administradora) => administradora.csicp_bb019.ID === internalSelectedAdministradora.value
                );
                if (selected) {
                    internalSelectedAdministradora.value = selected.csicp_bb019.ID;
                }
            }
        } else {
            console.error('Erro ao buscar os administradoras:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os administradoras:', error);
    }
};

onMounted(async () => {
    await fetchAdministradoras();
});

watch(internalSelectedAdministradora, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedAdministradora.value);
}
</script>
