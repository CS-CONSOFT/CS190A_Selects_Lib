<template>
    <v-select
        v-model="internalSelectedJuros"
        :items="juros"
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
import { getEstaticasBB012 } from '@/services/estaticasNovas/bb012_Estaticas';
import { StaticTypesBB012 } from '@/utils/enums/staticTypesBB012';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const juros = ref<{ title: string; value: string }[]>([]);
const internalSelectedJuros = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione uma situação de juros');

const fetchJuros = async () => {
    try {
        const response = await getEstaticasBB012(StaticTypesBB012.CSICP_BB01201_JUR);
        if (response.status === 200) {
            const fetchedData = response.data as unknown as { title: string; value: string }[];

            juros.value = [{ title: '', value: '0' }, ...fetchedData];

            if (internalSelectedJuros.value) {
                const selected = juros.value.find((juros) => juros.value === internalSelectedJuros.value);
                if (selected) {
                    internalSelectedJuros.value = selected.value;
                }
            }
        } else {
            console.error('Erro ao buscar as situações de juros:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar as situações de juros:', error);
    }
};

onMounted(async () => {
    await fetchJuros();
});

watch(internalSelectedJuros, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedJuros.value);
}
</script>
