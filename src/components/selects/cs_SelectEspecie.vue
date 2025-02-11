<template>
    <v-select
        v-model="internalSelectedEspecie"
        :items="especies"
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
import { getUserFromLocalStorage } from '../../utils/getUserStorage';
import { getCombosFF } from '../../services/combos/ff_Combos';
import { ComboTypesFF } from '../../utils/enums/comboTypeFF';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const user = getUserFromLocalStorage();
const tenant = user?.TenantId;
const especies = ref<{ title: string; value: string }[]>([]);
const internalSelectedEspecie = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione uma especie');

const fetchEspecies = async () => {
    try {
        const response = await getCombosFF(tenant, ComboTypesFF.csicp_ff103);
        if (response.status === 200) {
            const fetchedData = response.data as unknown as { title: string; value: string }[];

            especies.value = [{ title: '', value: '' }, ...fetchedData];

            if (internalSelectedEspecie.value) {
                const selected = especies.value.find((especie) => especie.value === internalSelectedEspecie.value);
                if (selected) {
                    internalSelectedEspecie.value = selected.value;
                }
            }
        } else {
            console.error('Erro ao buscar as especies:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar as especies:', error);
    }
};

onMounted(async () => {
    await fetchEspecies();
});

watch(internalSelectedEspecie, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedEspecie.value);
}
</script>
