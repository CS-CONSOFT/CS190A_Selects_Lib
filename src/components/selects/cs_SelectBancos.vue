<template>
    <v-select
        v-model="internalSelectedBanco"
        :items="filteredBancos"
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
import { getEstaticasBB } from '../../services/estaticas/bb_Estaticas';
import { StaticTypeBB } from '../../utils/enums/staticTypeBB';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const bancos = ref<{ title: string; value: number }[]>([]);
const internalSelectedBanco = ref<number | null>(null);
const search = ref<string>('');

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um banco');

const filteredBancos = computed(() => {
    const bancosComItemVazio = [{ title: '', value: 0 }, ...bancos.value];

    if (!search.value) {
        return bancosComItemVazio;
    }

    const searchText = search.value.toLowerCase();
    return bancosComItemVazio.filter((item) => item.title.toLowerCase().includes(searchText));
});

const fetchBancos = async () => {
    try {
        const response = await getEstaticasBB(StaticTypeBB.CSICP_BB006_BANCO);

        if (response.status === 200) {
            bancos.value = response.data as unknown as { title: string; value: number }[];
            if (internalSelectedBanco.value) {
                const selected = bancos.value.find((banco) => banco.value === internalSelectedBanco.value);
                if (selected) {
                    internalSelectedBanco.value = selected.value;
                }
            }
        } else {
            console.error('Erro ao buscar os bancos:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os bancos:', error);
    }
};

onMounted(async () => {
    await fetchBancos();
});

watch(internalSelectedBanco, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedBanco.value);
}
</script>
