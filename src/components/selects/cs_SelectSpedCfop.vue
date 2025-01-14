<template>
    <v-select
        v-model="internalSelectedCFOP"
        :items="filteredCfop"
        item-value="value"
        item-text="title"
        variant="solo-filled"
        hide-details
        @change="emitSelection"
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
import { ref, computed, onMounted, watch } from 'vue';
import { getEstaticasSPED } from '../../services/estaticas/sped_Estaticas';
import { StaticTypeSPED } from '../../utils/enums/staticTypeSPED';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const cfops = ref<{ title: string; value: number }[]>([]);
const internalSelectedCFOP = ref<number | null>(null);
const search = ref<string>('');

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um código CFOP');

const filteredCfop = computed(() => {
    const cfopsComItemVazio = [{ title: '', value: 0 }, ...cfops.value];

    if (!search.value) {
        return cfopsComItemVazio;
    }

    const searchText = search.value.toLowerCase();
    return cfopsComItemVazio.filter((item) => item.title.toLowerCase().includes(searchText));
});

const fetchCfop = async () => {
    try {
        const response = await getEstaticasSPED(StaticTypeSPED.SpedInCfop);
        if (response.status === 200) {
            cfops.value = response.data as unknown as { title: string; value: number }[];
            if (internalSelectedCFOP.value) {
                const selected = cfops.value.find((cfop) => cfop.value === internalSelectedCFOP.value);
                if (selected) {
                    internalSelectedCFOP.value = selected.value;
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
