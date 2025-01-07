<template>
    <v-select
        v-model="internalSelectedTratamento"
        :items="tratamento"
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
import { getEstaticasBB } from '../../services/estaticas/bb_Estaticas';
import { StaticTypeBB } from '../../utils/enums/staticTypeBB';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const tratamento = ref<{ title: string; value: string }[]>([]);
const internalSelectedTratamento = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um tratamento');

const fetchTratamento = async () => {
    try {
        const response = await getEstaticasBB(StaticTypeBB.CSICP_BB035_TRAT);
        if (response.status === 200) {
            const fetchedData = response.data as unknown as { title: string; value: string }[];

            tratamento.value = [{ title: '', value: '0' }, ...fetchedData];

            if (internalSelectedTratamento.value) {
                const selected = tratamento.value.find((tratamento) => tratamento.value === internalSelectedTratamento.value);
                if (selected) {
                    internalSelectedTratamento.value = selected.value;
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
