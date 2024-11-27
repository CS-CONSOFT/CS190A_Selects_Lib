<template>
    <v-select
        v-model="internalSelectedEscolaridade"
        :items="formattedEscolaridade"
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
import { GetListEstaticasBB012 } from '../../services/estaticas/estaticas_bb012';
import type { Csicp_bb01202_Esc } from '../../types/estaticas/BB/bb012_Estaticas';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const escolaridade = ref<Csicp_bb01202_Esc[]>([]);
const internalSelectedEscolaridade = ref<number | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um grau de escolaridade');

const formattedEscolaridade = computed(() => {
    return [
        { title: '', value: 0 },
        ...escolaridade.value.map((item) => ({
            title: item.Label,
            value: item.Id
        }))
    ];
});

const fetchEscolaridade = async () => {
    try {
        const response = await GetListEstaticasBB012();
        if (response.status === 200) {
            escolaridade.value = response.data.csicp_bb01202_Esc;
            if (internalSelectedEscolaridade.value) {
                const selected = escolaridade.value.find((escolaridade) => escolaridade.Id === internalSelectedEscolaridade.value);
                if (selected) {
                    internalSelectedEscolaridade.value = selected.Id;
                }
            }
        } else {
            console.error('Erro ao buscar os graus de escolaridade:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os graus de escolaridade:', error);
    }
};

onMounted(async () => {
    await fetchEscolaridade();
});

watch(internalSelectedEscolaridade, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedEscolaridade.value);
}
</script>
