<template>
    <v-select
        v-model="internalSelectedDomicilio"
        :items="formattedDomicilio"
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
import type { Csicp_bb01202_Dom } from '../../types/estaticas/BB/bb012_Estaticas';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const domicilio = ref<Csicp_bb01202_Dom[]>([]);
const internalSelectedDomicilio = ref<number | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um tipo de domicílio');

const formattedDomicilio = computed(() => {
    return [
        { title: '', value: 0 },
        ...domicilio.value.map((item) => ({
            title: item.Label,
            value: item.Id
        }))
    ];
});

const fetchDomicilio = async () => {
    try {
        const response = await GetListEstaticasBB012();
        if (response.status === 200) {
            domicilio.value = response.data.csicp_bb01202_Dom;
            if (internalSelectedDomicilio.value) {
                const selected = domicilio.value.find((domicilio) => domicilio.Id === internalSelectedDomicilio.value);
                if (selected) {
                    internalSelectedDomicilio.value = selected.Id;
                }
            }
        } else {
            console.error('Erro ao buscar os tipos de domicílio:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os tipos de domicílio:', error);
    }
};

onMounted(async () => {
    await fetchDomicilio();
});

watch(internalSelectedDomicilio, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedDomicilio.value);
}
</script>
