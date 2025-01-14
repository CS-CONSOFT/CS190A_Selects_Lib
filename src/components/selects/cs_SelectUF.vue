<template>
    <v-select
        v-model="internalSelectedUF"
        :items="unidadesFederativas"
        item-value="value"
        item-text="title"
        variant="solo-filled"
        hide-details
        @change="emitSelection"
        class="custom-select"
    >
        <template v-slot:label>
            <span class="d-flex align-center" style="font-size: 12px; font-weight: 500; padding-bottom: 0.1em; color: #808080">
                {{ computedLabel }}<span v-if="props.Prm_isObrigatorio" class="text-error">*</span>
            </span>
        </template>
    </v-select>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { getUserFromLocalStorage } from '../../utils/getUserStorage';
import { getComboUfs } from '@/services/combos/aa027_ComboUfs';

const props = defineProps<{
    selectedPais: string | null;
    modelValue: string | null;
    Prm_etiqueta?: string;
    Prm_isObrigatorio?: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const user = getUserFromLocalStorage();
const tenant = user?.TenantId;
const unidadesFederativas = ref<{ title: string; value: string }[]>([]);
const internalSelectedUF = ref<string | null>(props.modelValue);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione uma UF');

const fetchUnidadesFederativas = async (paisId: string) => {
    try {
        const response = await getComboUfs(tenant, paisId);
        if (response.status === 200) {
            const fetchedData = response.data as unknown as { title: string; value: string }[];

            unidadesFederativas.value = [{ title: '', value: '' }, ...fetchedData];

            if (props.modelValue) {
                const selected = unidadesFederativas.value.find((uf) => uf.value === props.modelValue);
                if (selected) {
                    internalSelectedUF.value = selected.value;
                }
            }
        } else {
            console.error('Erro ao buscar as unidades federativas:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar as unidades federativas:', error);
    }
};

watch(
    () => props.selectedPais,
    (newPais) => {
        const paisId = newPais || 'a7c1b7fb-1780-4a39-b827-556c63d55856';
        fetchUnidadesFederativas(paisId);
    },
    { immediate: true }
);

watch(internalSelectedUF, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedUF.value);
}
</script>
