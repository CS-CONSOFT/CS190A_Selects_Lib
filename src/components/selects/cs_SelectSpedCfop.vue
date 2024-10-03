<template>
    <v-select
        v-model="internalSelectedCFOP"
        :items="filteredCfop"
        item-value="value"
        item-text="title"
        variant="solo-filled"
        hide-details
        @change="emitSelection"
        return-object
        :menu-props="{ offsetY: true, width: '70%' }"
        content-class="custom-select-menu"
    >
        <template v-slot:prepend-item>
            <v-row class="sticky-search-field pa-0">
                <v-text-field
                    v-model="search"
                    prepend-inner-icon="mdi-magnify"
                    label="Pesquisar"
                    single-line
                    variant="solo-filled"
                    hide-details
                    clearable
                />
            </v-row>

            <v-divider class="mt-2"></v-divider>
        </template>

        <template v-slot:label>
            <span class="d-flex align-center" style="font-size: 12px; font-weight: 500; padding-bottom: 0.1em; color: #808080">
                {{ computedLabel }}<span v-if="props.Prm_isObrigatorio" class="text-error">*</span>
            </span>
        </template>
    </v-select>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { getListEstaticasSpedCFOP } from '../../services/estaticas/sped_cfop';
import type { SpedInCFOP } from '../../types/basico/estaticas/SPED/sped_in_cfop_estaticas';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const cfops = ref<SpedInCFOP[]>([]);
const internalSelectedCFOP = ref<string | null>(null);
const search = ref<string>('');

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um código CFOP');

const filteredCfop = computed(() => {
    if (!search.value) {
        return cfops.value.map((item) => ({
            title: `${item.Codigo} - ${item.Descricao}`,
            value: item.Id
        }));
    }

    const searchText = search.value.toLowerCase();
    return cfops.value
        .filter((item) => item.Codigo.toLowerCase().includes(searchText) || item.Descricao.toLowerCase().includes(searchText))
        .map((item) => ({
            title: `${item.Codigo} - ${item.Descricao}`,
            value: item.Id
        }));
});

const fetchCfop = async () => {
    try {
        const response = await getListEstaticasSpedCFOP();
        if (response.status === 200) {
            cfops.value = response.data.sped_in_CFOP;
            if (internalSelectedCFOP.value) {
                const selected = cfops.value.find((cfop) => cfop.Id === Number(internalSelectedCFOP.value));
                if (selected) {
                    internalSelectedCFOP.value = selected.Id.toString();
                }
            }
        } else {
            console.error('Erro ao buscar os CFOPs:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os CFOPs:', error);
    }
};

onMounted(async () => {
    await fetchCfop();
});

watch(internalSelectedCFOP, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedCFOP.value);
}
</script>
<style scoped>
.sticky-search-field {
    position: sticky;
    top: 0;
    z-index: 1;
    color: lightgray;
    padding: 0;
    margin: 0;
}

.custom-select-menu {
    padding: 0 !important;
}
</style>
