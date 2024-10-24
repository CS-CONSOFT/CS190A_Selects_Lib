<template>
    <v-select
        v-model="internalSelectedCidade"
        :items="formattedCidades"
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
import { ref, computed, watch, onMounted } from 'vue';
import { getUserFromLocalStorage } from '../../utils/getUserStorage';
import { getListaCidadesCombo } from '../../services/enderecamento/combos/aa028_comboCidades';
import type { Csicp_aa028 } from '../../types/enderecamento/combos/Combo_CidadeTypes';

const props = defineProps<{
    selectedUF: string | null;
    modelValue: string | null;
    Prm_etiqueta?: string;
    Prm_isObrigatorio?: boolean;
}>();

const user = getUserFromLocalStorage();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const cidades = ref<Csicp_aa028[]>([]);
const internalSelectedCidade = ref<string | null>(props.modelValue);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione uma cidade');

const formattedCidades = computed(() => {
    return [
        { title: '', value: null },
        ...cidades.value.map((item) => ({
            title: item.AA028_Cidade,
            value: item.Id
        }))
    ];
});

const fetchCidades = async (ufId: string) => {
    try {
        const response = await getListaCidadesCombo(user?.TenantId, ufId);
        if (response.status === 200) {
            cidades.value = response.data.Lista_csicp_aa028.map((item: { csicp_aa028: any }) => item.csicp_aa028);
            if (props.modelValue) {
                const selected = cidades.value.find((cidade) => cidade.Id === props.modelValue);
                if (selected) {
                    internalSelectedCidade.value = selected.Id;
                }
            }
        } else {
            console.error('Erro ao buscar as cidades:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar as cidades:', error);
    }
};

watch(
    () => props.selectedUF,
    (newUF) => {
        internalSelectedCidade.value = null;

        if (newUF) {
            fetchCidades(newUF);
        } else {
            cidades.value = [];
        }
    },
    { immediate: true }
);

watch(internalSelectedCidade, (newVal) => {
    emit('update:modelValue', newVal);
});

onMounted(() => {
    if (props.selectedUF) {
        fetchCidades(props.selectedUF);
    }
});

function emitSelection() {
    emit('update:modelValue', internalSelectedCidade.value);
}
</script>
