<template>
    <v-select
        v-model="internalSelectedClasse"
        :items="formattedClasse"
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
import type { Csicp_bb012_ClaCta } from '../../types/estaticas/BB/bb012_Estaticas';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const classe = ref<Csicp_bb012_ClaCta[]>([]);
const internalSelectedClasse = ref<number | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione uma classe');

const formattedClasse = computed(() => {
    return [
        { title: '', value: 0 },
        ...classe.value.map((item) => ({
            title: item.Label,
            value: item.Id
        }))
    ];
});

const fetchClasse = async () => {
    try {
        const response = await GetListEstaticasBB012();
        if (response.status === 200) {
            classe.value = response.data.csicp_bb012_ClaCta;
            if (internalSelectedClasse.value) {
                const selected = classe.value.find((classe) => classe.Id === internalSelectedClasse.value);
                if (selected) {
                    internalSelectedClasse.value = selected.Id;
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
