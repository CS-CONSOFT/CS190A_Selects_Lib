<template>
    <v-select
        v-model="internalSelectedGrau"
        :items="formattedGrauParentesco"
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
import { GetListEstaticasCRM } from '../../services/estaticas/estaticas_crm';
import type { Csicp_bb035_gpa } from '../../types/estaticas/CRM/crm_estaticas';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const grauParentesco = ref<Csicp_bb035_gpa[]>([]);
const internalSelectedGrau = ref<number | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um grau de parentesco');

const formattedGrauParentesco = computed(() => {
    return [
        { title: '', value: 0 },
        ...grauParentesco.value.map((item) => ({
            title: item.Label,
            value: item.Id
        }))
    ];
});

const fetchGrauParentesco = async () => {
    try {
        const response = await GetListEstaticasCRM();
        if (response.status === 200) {
            grauParentesco.value = response.data.csicp_bb035_gpa;
            if (internalSelectedGrau.value) {
                const selected = grauParentesco.value.find((grau) => grau.Id === internalSelectedGrau.value);
                if (selected) {
                    internalSelectedGrau.value = selected.Id;
                }
            }
        } else {
            console.error('Erro ao buscar os graus de parentesco:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os graus de parentesco:', error);
    }
};

onMounted(async () => {
    await fetchGrauParentesco();
});

watch(internalSelectedGrau, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedGrau.value);
}
</script>
