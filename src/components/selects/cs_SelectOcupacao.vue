<template>
    <v-select
        v-model="internalSelectedOcupacao"
        :items="formattedOcupacao"
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
import type { Csicp_bb01202_Ocu } from '../../types/estaticas/BB/bb012_Estaticas';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const ocupacao = ref<Csicp_bb01202_Ocu[]>([]);
const internalSelectedOcupacao = ref<number | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione uma ocupação');

const formattedOcupacao = computed(() => {
    return [
        { title: '', value: 0 },
        ...ocupacao.value.map((item) => ({
            title: item.Label,
            value: item.Id
        }))
    ];
});

const fetchOcupacao = async () => {
    try {
        const response = await GetListEstaticasBB012();
        if (response.status === 200) {
            ocupacao.value = response.data.csicp_bb01202_Ocu;
            if (internalSelectedOcupacao.value) {
                const selected = ocupacao.value.find((ocupacao) => ocupacao.Id === internalSelectedOcupacao.value);
                if (selected) {
                    internalSelectedOcupacao.value = selected.Id;
                }
            }
        } else {
            console.error('Erro ao buscar as ocupações:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar as ocupações:', error);
    }
};

onMounted(async () => {
    await fetchOcupacao();
});

watch(internalSelectedOcupacao, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedOcupacao.value);
}
</script>
