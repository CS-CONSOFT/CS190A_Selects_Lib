<template>
    <v-select
        v-model="internalSelectedTratamento"
        :items="formattedTratamento"
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
import { GetListEstaticasCRM } from '../../services/estaticas/estaticas_crm';
import type { Csicp_bb035_Trat } from '../../types/estaticas/CRM/crm_estaticas';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const tratamento = ref<Csicp_bb035_Trat[]>([]);
const internalSelectedTratamento = ref<number | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um tratamento');

const formattedTratamento = computed(() => {
    return [
        { title: '', value: 0 },
        ...tratamento.value.map((item) => ({
            title: item.Label,
            value: item.Id
        }))
    ];
});

const fetchTratamento = async () => {
    try {
        const response = await GetListEstaticasCRM();
        if (response.status === 200) {
            tratamento.value = response.data.csicp_bb035_Trat;
            if (internalSelectedTratamento.value) {
                const selected = tratamento.value.find((tratamento) => tratamento.Id === internalSelectedTratamento.value);
                if (selected) {
                    internalSelectedTratamento.value = selected.Id;
                }
            }
        } else {
            console.error('Erro ao buscar os tratamentos:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os tratamentos:', error);
    }
};

onMounted(async () => {
    await fetchTratamento();
});

watch(internalSelectedTratamento, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedTratamento.value);
}
</script>
