<template>
    <v-select
        v-model="internalSelectedTpImposto"
        :items="tipoImposto"
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
import { getEstaticasAA } from '../../services/estaticas/aa_Estaticas';
import { StaticTypeAA } from '../../utils/enums/staticTypeAA';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const tipoImposto = ref<{ title: string; value: number }[]>([]);
const internalSelectedTpImposto = ref<number | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um tipo de imposto');

// Função para buscar os tipos de imposto
const fetchTipoImposto = async () => {
    try {
        const response = await getEstaticasAA(StaticTypeAA.CSICP_AA037_Imps);

        if (response.status === 200) {
            const fetchedData = response.data as unknown as { title: string; value: number }[];

            tipoImposto.value = [{ title: '', value: 0 }, ...fetchedData];

            if (internalSelectedTpImposto.value) {
                const selected = tipoImposto.value.find((imposto) => imposto.value === internalSelectedTpImposto.value);
                if (selected) {
                    internalSelectedTpImposto.value = selected.value;
                }
            }
        } else {
            console.error('Erro ao buscar os tipos de imposto:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os tipos de imposto:', error);
    }
};

// Chama a busca de dados na montagem do componente
onMounted(async () => {
    await fetchTipoImposto();
});

// Emite o valor selecionado sempre que ele muda
watch(internalSelectedTpImposto, (newVal) => {
    emit('update:modelValue', newVal);
});

// Função para emitir o valor ao selecionar no dropdown
function emitSelection() {
    emit('update:modelValue', internalSelectedTpImposto.value);
}
</script>
