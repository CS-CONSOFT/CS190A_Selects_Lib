<template>
    <v-select
        v-model="internalSelected"
        :items="filteredItems"
        item-value="value"
        item-text="title"
        hide-details
        @change="emitSelection"
        return-object
        :menu-props="{ offsetY: true, width: '80%' }"
    >
        <template v-slot:prepend-item>
            <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" label="Pesquisar" single-line hide-details clearable />
        </template>

        <template v-slot:label>
            <span class="d-flex align-center" style="font-size: 14px; font-weight: 500; padding-bottom: 0.1em; color: #808080">
                {{ computedLabel }}<span v-if="props.Prm_isObrigatorio" class="text--red">*</span>
            </span>
        </template>
    </v-select>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { handleCnaeGetList } from '../../services/gestao/empresa/HandleCnae';
import type { Csicp_aa029_ListItem } from '../../types/gestao/aa029_types';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

//update = se algum evento acontecer na tela, reatualizar a lista
const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean; update: boolean }>();

const internalSelected = ref<string>('');
const search = ref<string>('');

const dataFetchedList = ref<Csicp_aa029_ListItem[]>([
    {
        aa029_Id: '',
        aa029_CNAE: '',
        aa029_Descricao: '',
        aa029_NotaExplicativa: '',
        aa029_IsActive: false
    }
]);

async function fetchData() {
    try {
        handleCnaeGetList({ in_search: '', in_currentPage: 1, in_pageSize: 10 })
            .then((res: { csicp_aa029_List: any }) => {
                dataFetchedList.value = res.csicp_aa029_List;
            })
            .catch((err: any) => {
                console.log(err);
            });
    } catch (error) {
        console.log(error);
    } finally {
    }
}

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um CNAE');

const filteredItems = computed(() => {
    if (!search.value) {
        return dataFetchedList.value.map((item: { aa029_CNAE: any; aa029_Descricao: any; aa029_Id: any }) => ({
            title: `${item.aa029_CNAE}-${item.aa029_Descricao}`,
            value: item.aa029_Id
        }));
    }

    const searchText = search.value.toLowerCase();
    return dataFetchedList.value
        .filter(
            (item: { aa029_Descricao: string; aa029_CNAE: string }) =>
                item.aa029_Descricao.toLowerCase().includes(searchText) || item.aa029_CNAE.toLowerCase().includes(searchText)
        )
        .map((item: { aa029_CNAE: any; aa029_Descricao: any; aa029_Id: any }) => ({
            title: `${item.aa029_CNAE} - ${item.aa029_Descricao}`,
            value: item.aa029_Id
        }));
});

onMounted(() => {
    fetchData();
});

watch(internalSelected, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelected.value);
}
</script>
