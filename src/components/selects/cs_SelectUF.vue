<template>
    <v-select
        v-model="internalSelectedUF"
        :items="formattedUnidadesFederativas"
        item-value="value"
        item-text="title"
        variant="solo-filled"
        hide-details
        @change="emitSelection"
        class="custom-select"
    >
        <template v-slot:label>
            <span class="d-flex align-center" style="font-size: 12px; font-weight: 500; padding-bottom: 0.1em; color: #808080">
                {{ computedLabel }}<span v-if="props.Prm_isObrigatorio" class="text-error">*</span>
            </span>
        </template>
    </v-select>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { getUserFromLocalStorage } from '../../utils/getUserStorage';
import getListaUFCombo from '../../services/enderecamento/combos/aa027_comboUF';
import type { Csicp_aa027 } from '../../types/enderecamento/combos/Combo_UnFederativaTypes';

const props = defineProps<{
    selectedPais: string | null;
    modelValue: string | null;
    Prm_etiqueta?: string;
    Prm_isObrigatorio?: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const user = getUserFromLocalStorage();
const tenant = user?.TenantId;
const unidadesFederativas = ref<Csicp_aa027[]>([]);
const internalSelectedUF = ref<string | null>(props.modelValue);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione uma UF');

const formattedUnidadesFederativas = computed(() => {
    return unidadesFederativas.value.map((item) => ({
        title: item.AA027_Sigla,
        value: item.Id
    }));
});

// Função para buscar as unidades federativas baseado no ID do país
const fetchUnidadesFederativas = async (paisId: string) => {
    try {
        const response = await getListaUFCombo(tenant, paisId);
        if (response.status === 200) {
            unidadesFederativas.value = response.data.Lista_csicp_aa027.map((item: { csicp_aa027: any }) => item.csicp_aa027);
            if (props.modelValue) {
                const selected = unidadesFederativas.value.find((uf) => uf.Id === props.modelValue);
                if (selected) {
                    internalSelectedUF.value = selected.Id;
                }
            }
        } else {
            console.error('Erro ao buscar as unidades federativas:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar as unidades federativas:', error);
    }
};

watch(
    () => props.selectedPais,
    (newPais) => {
        const paisId = newPais || 'Brasil';
        fetchUnidadesFederativas(paisId);
    },
    { immediate: true }
);

watch(internalSelectedUF, (newVal) => {
    emit('update:modelValue', newVal);
});

onMounted(() => {
    const paisId = props.selectedPais || 'Brasil';
    fetchUnidadesFederativas(paisId);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedUF.value);
}
</script>
