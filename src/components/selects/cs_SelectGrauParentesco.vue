<template>
    <v-select
        v-model="internalSelectedGrau"
        :items="grauParentesco"
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
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const grauParentesco = ref<{ title: string; value: number }[]>([]);
const internalSelectedGrau = ref<number | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um grau de parentesco');

const fetchGrauParentesco = async () => {
    try {
        const response = await getEstaticasBB(StaticTypeBB.CSICP_BB035_GPA);
        if (response.status === 200) {
            const fetchedData = response.data as unknown as { title: string; value: number }[];

            grauParentesco.value = [{ title: '', value: 0 }, ...fetchedData];

            if (internalSelectedGrau.value) {
                const selected = grauParentesco.value.find((grau) => grau.value === internalSelectedGrau.value);
                if (selected) {
                    internalSelectedGrau.value = selected.value;
                }
            }
        } else {
            console.error('Erro ao buscar os graus de parentesco:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os graus de parentesco:', error);
    }
};

onMounted(async () => {
    await fetchGrauParentesco();
});

watch(internalSelectedGrau, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedGrau.value);
}
</script>
