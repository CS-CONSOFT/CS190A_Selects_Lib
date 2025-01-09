<template>
    <v-select
        v-model="internalSelectedEscolaridade"
        :items="escolaridade"
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
import { getEstaticasBB012 } from '../../services/estaticas/bb012_Estaticas';
import { StaticTypesBB012 } from '../../utils/enums/staticTypesBB012';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const escolaridade = ref<{ title: string; value: number }[]>([]);
const internalSelectedEscolaridade = ref<number | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um grau de escolaridade');

const fetchEscolaridade = async () => {
    try {
        const response = await getEstaticasBB012(StaticTypesBB012.CSICP_BB01202_ESC);
        if (response.status === 200) {
            const fetchedData = response.data as unknown as { title: string; value: number }[];

            escolaridade.value = [{ title: '', value: 0 }, ...fetchedData];

            if (internalSelectedEscolaridade.value) {
                const selected = escolaridade.value.find((escolaridade) => escolaridade.value === internalSelectedEscolaridade.value);
                if (selected) {
                    internalSelectedEscolaridade.value = selected.value;
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
