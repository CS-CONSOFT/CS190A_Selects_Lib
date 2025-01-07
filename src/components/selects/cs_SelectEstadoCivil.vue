<template>
    <v-select
        v-model="internalSelectedEstadoCivil"
        :items="estadoCivil"
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
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const estadoCivil = ref<{ title: string; value: string }[]>([]);
const internalSelectedEstadoCivil = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um estado civil');

const fetchEstadoCivil = async () => {
    try {
        const response = await getEstaticasBB012(StaticTypesBB012.CSICP_BB01202_ECIV);
        if (response.status === 200) {
            const fetchedData = response.data as unknown as { title: string; value: string }[];

            estadoCivil.value = [{ title: '', value: '0' }, ...fetchedData];

            if (internalSelectedEstadoCivil.value) {
                const selected = estadoCivil.value.find((estadoCivil) => estadoCivil.value === internalSelectedEstadoCivil.value);
                if (selected) {
                    internalSelectedEstadoCivil.value = selected.value;
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
