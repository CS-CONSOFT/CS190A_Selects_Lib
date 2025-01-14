<template>
    <v-select
        v-model="internalSelectedPais"
        :items="paises"
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
import { getComboPaises } from '../../services/combos/aa025_ComboPais';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const user = getUserFromLocalStorage();
const tenant = user?.TenantId;
const paises = ref<{ title: string; value: string }[]>([]);
const internalSelectedPais = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um país');

const fetchPaises = async () => {
    try {
        const response = await getComboPaises(tenant);
        if (response.status === 200) {
            const fetchedData = response.data as unknown as { title: string; value: string }[];

            paises.value = [{ title: '', value: '' }, ...fetchedData];

            if (internalSelectedPais.value) {
                const selected = paises.value.find((pais) => pais.value === internalSelectedPais.value);
                if (selected) {
                    internalSelectedPais.value = selected.value;
                }
            }
        } else {
            console.error('Erro ao buscar os países:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os países:', error);
    }
};

onMounted(async () => {
    await fetchPaises();
});

watch(internalSelectedPais, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedPais.value);
}
</script>
