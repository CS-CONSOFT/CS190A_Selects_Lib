<template>
    <v-select
        v-model="internalSelectedGrupo"
        :items="formattedGrupo"
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

const grupo = ref<Csicp_bb012_GruCta[]>([]);
const internalSelectedGrupo = ref<number | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um grupo');

const formattedGrupo = computed(() => {
    return [
        { title: '', value: 0 },
        ...grupo.value.map((item) => ({
            title: item.Label,
            value: item.Id
        }))
    ];
});

const fetchGrupo = async () => {
    try {
        const response = await GetListEstaticasBB012();
        if (response.status === 200) {
            grupo.value = response.data.csicp_bb012_GruCta;
            if (internalSelectedGrupo.value) {
                const selected = grupo.value.find((grupo) => grupo.Id === internalSelectedGrupo.value);
                if (selected) {
                    internalSelectedGrupo.value = selected.Id;
                }
            }
        } else {
            console.error('Erro ao buscar os grupos:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os grupos:', error);
    }
};

onMounted(async () => {
    await fetchGrupo();
});

watch(internalSelectedGrupo, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedGrupo.value);
}
</script>
