<template>
    <v-select
        v-model="internalSelectedResponsavel"
        :items="formattedResponsavel"
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
import { getListResponsaveisCombo } from '../../services/basico/combos/bb007_comboResponsaveis';
import type { Lista_bb007 } from '../../types/basico/responsavel/combos/Combo_ResponsaveisTypes';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const user = getUserFromLocalStorage();
const tenant = user?.TenantId;
const responsaveis = ref<Lista_bb007[]>([]);
const internalSelectedResponsavel = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um responsável');

const formattedResponsavel = computed(() => {
    return [
        { title: '', value: '' },
        ...responsaveis.value.map((item) => ({
            title: item.BB007_NomeReduzido,
            value: item.ID
        }))
    ];
});

const fetchResponsaveis = async () => {
    try {
        const response = await getListResponsaveisCombo(tenant);
        if (response.status === 200) {
            responsaveis.value = response.data.Lista_bb007;
            if (internalSelectedResponsavel.value) {
                const selected = responsaveis.value.find((responsavel) => responsavel.ID === internalSelectedResponsavel.value);
                if (selected) {
                    internalSelectedResponsavel.value = selected.ID;
                }
            }
        } else {
            console.error('Erro ao buscar os responsáveis:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os responsáveis:', error);
    }
};

onMounted(async () => {
    await fetchResponsaveis();
});

watch(internalSelectedResponsavel, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedResponsavel.value);
}
</script>
