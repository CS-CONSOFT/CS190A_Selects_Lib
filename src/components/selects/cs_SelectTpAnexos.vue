<template>
    <v-select
        v-model="internalSelectedAnexos"
        :items="formattedAnexo"
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
import type { Csicp_bb012mtd } from '../../types/estaticas/BB/bb012_Estaticas';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const anexo = ref<Csicp_bb012mtd[]>([]);
const internalSelectedAnexos = ref<number | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um tipo');

const formattedAnexo = computed(() => {
    return [
        { title: '', value: 0 },
        ...anexo.value.map((item) => ({
            title: item.Label,
            value: item.Id
        }))
    ];
});

const fetchClasse = async () => {
    try {
        const response = await GetListEstaticasBB012();
        if (response.status === 200) {
            anexo.value = response.data.csicp_bb012mtd;
            if (internalSelectedAnexos.value) {
                const selected = anexo.value.find((anexo) => anexo.Id === internalSelectedAnexos.value);
                if (selected) {
                    internalSelectedAnexos.value = selected.Id;
                }
            }
        } else {
            console.error('Erro ao buscar os tipos:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os tipos:', error);
    }
};

onMounted(async () => {
    await fetchClasse();
});

watch(internalSelectedAnexos, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedAnexos.value);
}
</script>
