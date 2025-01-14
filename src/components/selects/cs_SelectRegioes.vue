<template>
    <v-select
        v-model="internalSelectedRegiao"
        :items="regioes"
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
import { getCombosAA } from '../../services/combos/aa_Combos';
import { ComboTypesAA } from '../../utils/enums/comboTypeAA';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const user = getUserFromLocalStorage();
const tenant = user?.TenantId;
const regioes = ref<{ title: string; value: string }[]>([]);
const internalSelectedRegiao = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione uma região');

const fetchRegioes = async () => {
    try {
        const response = await getCombosAA(tenant, ComboTypesAA.csicp_aa026);
        if (response.status === 200) {
            const fetchedData = response.data as unknown as { title: string; value: string }[];

            regioes.value = [{ title: '', value: '' }, ...fetchedData];

            if (internalSelectedRegiao.value) {
                const selected = regioes.value.find((regiao) => regiao.value === internalSelectedRegiao.value);
                if (selected) {
                    internalSelectedRegiao.value = selected.value;
                }
            }
        } else {
            console.error('Erro ao buscar as regiões:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar as regiões:', error);
    }
};

onMounted(async () => {
    await fetchRegioes();
});

watch(internalSelectedRegiao, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedRegiao.value);
}
</script>
