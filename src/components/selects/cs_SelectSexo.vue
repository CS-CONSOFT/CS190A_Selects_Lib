<template>
    <v-select
        v-model="internalSelectedSexo"
        :items="formattedSexo"
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
import type { Csicp_bb01202_Sex } from '../../types/estaticas/BB/bb012_Estaticas';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const sexo = ref<Csicp_bb01202_Sex[]>([]);
const internalSelectedSexo = ref<number | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um sexo');

const formattedSexo = computed(() => {
    return [
        { title: '', value: 0 },
        ...sexo.value.map((item) => ({
            title: item.Label,
            value: item.Id
        }))
    ];
});

const fetchSexo = async () => {
    try {
        const response = await GetListEstaticasBB012();
        if (response.status === 200) {
            sexo.value = response.data.csicp_bb01202_Sex;
            if (internalSelectedSexo.value) {
                const selected = sexo.value.find((sexo) => sexo.Id === internalSelectedSexo.value);
                if (selected) {
                    internalSelectedSexo.value = selected.Id;
                }
            }
        } else {
            console.error('Erro ao buscar os sexos:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os sexos:', error);
    }
};

onMounted(async () => {
    await fetchSexo();
});

watch(internalSelectedSexo, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedSexo.value);
}
</script>
