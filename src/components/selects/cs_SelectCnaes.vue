<template>
    <v-select
        v-model="internalSelectedCnaes"
        :items="filteredItems"
        item-value="value"
        item-text="title"
        hide-details
        @change="emitSelection"
        return-object
        :menu-props="{ offsetY: true, width: '40%' }"
    >
        <template v-slot:prepend-item>
            <v-row class="sticky-search-field pa-0">
                <v-text-field
                    class="pa-2"
                    v-model="search"
                    prepend-inner-icon="mdi-magnify"
                    label="Pesquisar"
                    single-line
                    variant="solo-filled"
                    hide-details
                    clearable
                    style="margin-bottom: 5px"
                />
            </v-row>
        </template>

        <template v-slot:label>
            <span class="d-flex align-center" style="font-size: 12px; font-weight: 500; padding-bottom: 0.1em; color: #808080">
                {{ computedLabel }}<span v-if="props.Prm_isObrigatorio" class="text-error">*</span>
            </span>
        </template>
    </v-select>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { getUserFromLocalStorage } from '../../utils/getUserStorage';
import { getCombosAA } from '../../services/combos/aa_Combos';
import { ComboTypesAA } from '../../utils/enums/comboTypeAA';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const user = getUserFromLocalStorage();
const tenant = user?.TenantId;
const cnaes = ref<{ title: string; value: string }[]>([]);
const internalSelectedCnaes = ref<string | null>(null);
const search = ref<string>('');

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um CNAE');

const filteredItems = computed(() => {
    const cnaesComItemVazio = [{ title: '', value: '' }, ...cnaes.value];

    if (!search.value) {
        return cnaesComItemVazio;
    }

    const searchText = search.value.toLowerCase();
    return cnaesComItemVazio.filter((item) => item.title.toLowerCase().includes(searchText));
});

const fetchCnaes = async () => {
    try {
        const response = await getCombosAA(tenant, ComboTypesAA.csicp_aa029);

        if (response.status === 200) {
            cnaes.value = response.data as unknown as { title: string; value: string }[];

            if (internalSelectedCnaes.value) {
                const selected = cnaes.value.find((cnaes) => cnaes.value === internalSelectedCnaes.value);
                if (selected) {
                    internalSelectedCnaes.value = selected.value;
                }
            }
        } else {
            console.error('Erro ao buscar os cnaes:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os cnaes:', error);
    }
};

onMounted(() => {
    fetchCnaes();
});

watch(internalSelectedCnaes, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedCnaes.value);
}
</script>
