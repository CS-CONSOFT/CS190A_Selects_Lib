<template>
    <v-select
        v-model="internalSelectedEmpresa"
        :items="empresa"
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
import { getEstaticasBB012 } from '../../services/estaticas/bb012_Estaticas';
import { StaticTypesBB012 } from '../../utils/enums/staticTypesBB012';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const empresa = ref<{ title: string; value: number }[]>([]);
const internalSelectedEmpresa = ref<number | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione o tipo de empresa');

const fetchEmpresa = async () => {
    try {
        const response = await getEstaticasBB012(StaticTypesBB012.CSICP_BB012_GRUCTA);
        if (response.status === 200) {
            const fetchedData = response.data as unknown as { title: string; value: number }[];

            empresa.value = [{ title: '', value: 0 }, ...fetchedData];

            if (internalSelectedEmpresa.value) {
                const selected = empresa.value.find((empresa) => empresa.value === internalSelectedEmpresa.value);
                if (selected) {
                    internalSelectedEmpresa.value = selected.value;
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
