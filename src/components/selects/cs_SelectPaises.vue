<template>
    <v-select
        v-model="internalSelectedPais"
        :items="formattedPaises"
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
import { getListaPaisesCombo } from '@/services/enderecamento/combos/aa025_comboPaises';
import type { Csicp_aa025 } from '@/types/enderecamento/combos/Combo_PaisesTypes';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const authStore = useAuthStore();
const tenant = authStore.user?.TenantId;
const paises = ref<Csicp_aa025[]>([]);
const internalSelectedPais = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um país');

const formattedPaises = computed(() => {
    return paises.value.map((item) => ({
        title: item.AA025_Descricao,
        value: item.Id
    }));
});

const fetchPaises = async () => {
    try {
        const response = await getListaPaisesCombo(tenant);
        if (response.status === 200) {
            paises.value = response.data.csicp_aa025;
            if (internalSelectedPais.value) {
                const selected = paises.value.find((pais) => pais.Id === internalSelectedPais.value);
                if (selected) {
                    internalSelectedPais.value = selected.Id;
                }
            }
        } else {
            console.error('Erro ao buscar os países:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os países:', error);
    }
};

onMounted(async () => {
    await fetchPaises();
});

watch(internalSelectedPais, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedPais.value);
}
</script>
