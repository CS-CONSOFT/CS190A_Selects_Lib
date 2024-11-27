<template>
    <v-select
        v-model="internalSelectedEmpresa"
        :items="formattedEmpresa"
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
import type { Csicp_bb012_GruCta } from '../../types/estaticas/BB/bb012_Estaticas';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const empresa = ref<Csicp_bb012_GruCta[]>([]);
const internalSelectedEmpresa = ref<number | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione o tipo de empresa');

const formattedEmpresa = computed(() => {
    return [
        { title: '', value: 0 },
        ...empresa.value.map((item) => ({
            title: item.Label,
            value: item.Id
        }))
    ];
});

const fetchEmpresa = async () => {
    try {
        const response = await GetListEstaticasBB012();
        if (response.status === 200) {
            empresa.value = response.data.csicp_bb012_GruCta;
            if (internalSelectedEmpresa.value) {
                const selected = empresa.value.find((empresa) => empresa.Id === internalSelectedEmpresa.value);
                if (selected) {
                    internalSelectedEmpresa.value = selected.Id;
                }
            }
        } else {
            console.error('Erro ao buscar os tipos de empresa:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os tipos de empresa:', error);
    }
};

onMounted(async () => {
    await fetchEmpresa();
});

watch(internalSelectedEmpresa, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedEmpresa.value);
}
</script>
