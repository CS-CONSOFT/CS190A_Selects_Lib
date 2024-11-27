<template>
    <v-select
        v-model="internalSelectedEstadoCivil"
        :items="formattedEstadoCivil"
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
import type { Csicp_bb01202_ECiv } from '../../types/estaticas/BB/bb012_Estaticas';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const estadoCivil = ref<Csicp_bb01202_ECiv[]>([]);
const internalSelectedEstadoCivil = ref<number | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um estado civil');

const formattedEstadoCivil = computed(() => {
    return [
        { title: '', value: 0 },
        ...estadoCivil.value.map((item) => ({
            title: item.Label,
            value: item.Id
        }))
    ];
});

const fetchEstadoCivil = async () => {
    try {
        const response = await GetListEstaticasBB012();
        if (response.status === 200) {
            estadoCivil.value = response.data.csicp_bb01202_ECiv;
            if (internalSelectedEstadoCivil.value) {
                const selected = estadoCivil.value.find((estadoCivil) => estadoCivil.Id === internalSelectedEstadoCivil.value);
                if (selected) {
                    internalSelectedEstadoCivil.value = selected.Id;
                }
            }
        } else {
            console.error('Erro ao buscar estado civil:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar estado civil:', error);
    }
};

onMounted(async () => {
    await fetchEstadoCivil();
});

watch(internalSelectedEstadoCivil, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedEstadoCivil.value);
}
</script>
