<template>
    <v-select
        v-model="internalSelectedModalidade"
        :items="formattedModalidades"
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
import { GetListEstaticasBB012 } from '@/services/estaticas/estaticas_bb012';
import type { Csicp_bb012_MRel } from '@/types/estaticas/BB/bb012_Estaticas';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const modRelacao = ref<Csicp_bb012_MRel[]>([]);
const internalSelectedModalidade = ref<number | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione uma modalidade');

const formattedModalidades = computed(() => {
    return [
        { title: '', value: 0 },
        ...modRelacao.value.map((item) => ({
            title: item.Label,
            value: item.Id
        }))
    ];
});

const fetchModalidades = async () => {
    try {
        const response = await GetListEstaticasBB012();
        if (response.status === 200) {
            modRelacao.value = response.data.csicp_bb012_MRel;
            if (internalSelectedModalidade.value) {
                const selected = modRelacao.value.find((modalidade) => modalidade.Id === internalSelectedModalidade.value);
                if (selected) {
                    internalSelectedModalidade.value = selected.Id;
                }
            }
        } else {
            console.error('Erro ao buscar as modalidades de relação:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar as modalidades de relação:', error);
    }
};

onMounted(async () => {
    await fetchModalidades();
});

watch(internalSelectedModalidade, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedModalidade.value);
}
</script>
