<template>
    <v-select
        v-model="internalSelectedSituacao"
        :items="formattedSituacao"
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
import type { Csicp_bb012_SitCta } from '@/types/estaticas/BB/bb012_Estaticas';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const situacao = ref<Csicp_bb012_SitCta[]>([]);
const internalSelectedSituacao = ref<number | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione uma situação');

const formattedSituacao = computed(() => {
    return [
        { title: '', value: 0 },
        ...situacao.value.map((item) => ({
            title: item.Label,
            value: item.Id
        }))
    ];
});

const fetchSituacao = async () => {
    try {
        const response = await GetListEstaticasBB012();
        if (response.status === 200) {
            situacao.value = response.data.csicp_bb012_SitCta;
            if (internalSelectedSituacao.value) {
                const selected = situacao.value.find((situacao) => situacao.Id === internalSelectedSituacao.value);
                if (selected) {
                    internalSelectedSituacao.value = selected.Id;
                }
            }
        } else {
            console.error('Erro ao buscar a situação da conta:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar a situação da conta:', error);
    }
};

onMounted(async () => {
    await fetchSituacao();
});

watch(internalSelectedSituacao, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedSituacao.value);
}
</script>
