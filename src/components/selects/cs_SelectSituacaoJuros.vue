<template>
    <v-select
        v-model="internalSelectedJuros"
        :items="formattedJuros"
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
import type { Csicp_bb01201_jur } from '../../types/estaticas/BB/bb012_Estaticas';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const juros = ref<Csicp_bb01201_jur[]>([]);
const internalSelectedJuros = ref<number | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione uma situação de juros');

const formattedJuros = computed(() => {
    return [
        { title: '', value: 0 },
        ...juros.value.map((item) => ({
            title: item.Label,
            value: item.Id
        }))
    ];
});

const fetchJuros = async () => {
    try {
        const response = await GetListEstaticasBB012();
        if (response.status === 200) {
            juros.value = response.data.csicp_bb01201_jur;
            if (internalSelectedJuros.value) {
                const selected = juros.value.find((juros) => juros.Id === internalSelectedJuros.value);
                if (selected) {
                    internalSelectedJuros.value = selected.Id;
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
