<template>
    <v-select
        v-model="internalSelectedTpImposto"
        :items="formattedTpImposto"
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
import { getListEstaticasAA } from '../../services/estaticas/estaticas_aa';
import type { Csicp_aa037_Imp } from '../../types/estaticas/AA/aa_Estaticas';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const tipoImposto = ref<Csicp_aa037_Imp[]>([]);
const internalSelectedTpImposto = ref<number | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um tipo de imposto');

const formattedTpImposto = computed(() => {
    return [
        { title: '', value: 0 },
        ...tipoImposto.value.map((item) => ({
            title: item.Label,
            value: item.Id
        }))
    ];
});

const fetchTipoImposto = async () => {
    try {
        const response = await getListEstaticasAA();
        if (response.status === 200) {
            tipoImposto.value = response.data.csicp_aa037_Imp;
            if (internalSelectedTpImposto.value) {
                const selected = tipoImposto.value.find((imposto) => imposto.Id === internalSelectedTpImposto.value);
                if (selected) {
                    internalSelectedTpImposto.value = selected.Id;
                }
            }
        } else {
            console.error('Erro ao buscar os tipos de imposto:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os tipos de imposto:', error);
    }
};

onMounted(async () => {
    await fetchTipoImposto();
});

watch(internalSelectedTpImposto, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedTpImposto.value);
}
</script>
