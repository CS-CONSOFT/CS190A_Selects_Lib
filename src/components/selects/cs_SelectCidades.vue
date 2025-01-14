<template>
    <v-select
        v-model="internalSelectedCidade"
        :items="cidades"
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
import { ref, computed, watch, onMounted } from 'vue';
import { getUserFromLocalStorage } from '../../utils/getUserStorage';
import { getComboCidades } from '../../services/combos/aa028_ComboCidades';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{
    selectedUF: string | null;
    modelValue: string | null;
    Prm_etiqueta?: string;
    Prm_isObrigatorio?: boolean;
}>();

const user = getUserFromLocalStorage();
const tenant = user?.TenantId;
const cidades = ref<{ title: string; value: string }[]>([]);
const internalSelectedCidade = ref<string | null>(props.modelValue);
const search = ref<string>('');

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione uma cidade');

const fetchCidades = async (ufId: string) => {
    try {
        const response = await getComboCidades(tenant, ufId, search.value);
        if (response.status === 200) {
            const fetchedData = response.data as unknown as { title: string; value: string }[];

            cidades.value = [{ title: '', value: '' }, ...fetchedData];

            if (props.modelValue) {
                const selected = cidades.value.find((cidade) => cidade.value === props.modelValue);
                if (selected) {
                    internalSelectedCidade.value = selected.value;
                }
            }
        } else {
            console.error('Erro ao buscar as cidades:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar as cidades:', error);
    }
};

watch(
    () => props.selectedUF,
    (newUF) => {
        internalSelectedCidade.value = null;

        if (newUF) {
            fetchCidades(newUF);
        } else {
            cidades.value = [];
        }
    },
    { immediate: true }
);

watch(internalSelectedCidade, (newVal) => {
    emit('update:modelValue', newVal);
});

onMounted(() => {
    if (props.selectedUF) {
        fetchCidades(props.selectedUF);
    }
});

function emitSelection() {
    emit('update:modelValue', internalSelectedCidade.value);
}
</script>
