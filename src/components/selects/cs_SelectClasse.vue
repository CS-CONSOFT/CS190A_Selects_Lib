<template>
    <v-select
        v-model="internalSelectedClasse"
        :items="classe"
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

const classe = ref<{ title: string; value: number }[]>([]);
const internalSelectedClasse = ref<number | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione uma classe');

const fetchClasse = async () => {
    try {
        const response = await getEstaticasBB012(StaticTypesBB012.CSICP_BB012_CLACTA);
        if (response.status === 200) {
            const fetchedData = response.data as unknown as { title: string; value: number }[];

            classe.value = [{ title: '', value: 0 }, ...fetchedData];

            if (internalSelectedClasse.value) {
                const selected = classe.value.find((classe) => classe.value === internalSelectedClasse.value);
                if (selected) {
                    internalSelectedClasse.value = selected.value;
                }
            }
        } else {
            console.error('Erro ao buscar as classes:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar as classes:', error);
    }
};

onMounted(async () => {
    await fetchClasse();
});

watch(internalSelectedClasse, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedClasse.value);
}
</script>
