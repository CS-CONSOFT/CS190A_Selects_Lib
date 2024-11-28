<template>
    <v-select
        v-model="internalSelectedNatureza"
        :items="formattedNatureza"
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
import { GetNaturezaCombo } from '../../services/basico/combos/bb025_comboNatureza';
import type { Lista_bb025_Completo } from '../../types/basico/natureza/bb025_naturezaOperacao';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const user = getUserFromLocalStorage();
const tenant = user?.TenantId;
const natureza = ref<Lista_bb025_Completo[]>([]);
const internalSelectedNatureza = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione uma natureza de operação');

const formattedNatureza = computed(() => {
    return [
        { title: '', value: '' },
        ...natureza.value.map((item) => ({
            title: item.Lista_bb025.csicp_bb025.BB025_Descricao,
            value: item.Lista_bb025.csicp_bb025.ID
        }))
    ];
});

const fetchNatureza = async () => {
    try {
        const response = await GetNaturezaCombo(tenant);
        if (response.status === 200) {
            natureza.value = response.data.Lista_bb025_Completo;
            if (internalSelectedNatureza.value) {
                const selected = natureza.value.find((natureza) => natureza.Lista_bb025.csicp_bb025.ID === internalSelectedNatureza.value);
                if (selected) {
                    internalSelectedNatureza.value = selected.Lista_bb025.csicp_bb025.ID;
                }
            }
        } else {
            console.error('Erro ao buscar as natureza de operação:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar as natureza de operação:', error);
    }
};

onMounted(async () => {
    await fetchNatureza();
});

watch(internalSelectedNatureza, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedNatureza.value);
}
</script>
