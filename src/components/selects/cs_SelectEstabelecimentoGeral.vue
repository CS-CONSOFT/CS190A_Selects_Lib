<template>
    <v-col v-if="loading">
        <v-progress-circular color="blue" height="10" indeterminate></v-progress-circular>
        <span class="d-flex align-center"
            style="font-size: 12px; font-weight: 500; padding-bottom: 0.1em; color: #808080">
            Procurando estabelecimentos
        </span>
    </v-col>

    <v-select v-if="!loading" v-model="selectedItem" :items="formattedList" item-value="value" item-text="title"
        variant="solo-filled" hide-details @change="emitSelection" class="custom-select">
        <template v-slot:label>
            <span class="d-flex align-center"
                style="font-size: 12px; font-weight: 500; padding-bottom: 0.1em; color: #808080">
                {{ props.Prm_etiqueta }}<span v-if="props.Prm_isObrigatorio" class="text-error">*</span>
            </span>
        </template>
    </v-select>
</template>

<script setup lang="ts">
import { URLBase } from '@/services/configuracoes_axios';
import { getUserFromLocalStorage } from '../../utils/getUserStorage';
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
    selectedItem: string | null;
    modelValue: string | null;
    Prm_etiqueta: string;
    Prm_isObrigatorio?: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const user = getUserFromLocalStorage();
const tenant = user?.TenantId;

const selectedItem = ref<string | null>(props.modelValue);
const formattedList = ref<{ title: string, value: string }[]>([{ title: '', value: '' }]);
const loading = ref(false);


// Função para buscar as unidades federativas baseado no ID do país
const fetch = async () => {
    loading.value = true;
    try {
        const header = {
            tenant_id: tenant,
            In_IsCount: 0,
            In_IsActive: true,
            in_search: "",
            in_currentPage: 1,
            in_pageSize: 999
        };

        const _response = await axios.get(`${URLBase}CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb001_Get_List_Estabelecimento_Simples`, { headers: header });
        const res = _response.data as IGetListaEstabelecimento;

        // Mapeamento otimizado
        formattedList.value = res.csicp_bb001.map(({ BB001_NomeFantasia, ID }) => ({
            title: BB001_NomeFantasia,
            value: ID
        }));
    } catch (error) {
        //@ts-ignore
        console.error('Erro ao buscar dado:', error.response?.data || error.message);
    } finally {
        loading.value = false;
    }
};


watch(selectedItem, (newVal) => {
    emit('update:modelValue', newVal);
});

onMounted(() => {
    fetch();
});

function emitSelection() {
    emit('update:modelValue', selectedItem.value);
}









//INTERFACE
export interface IGetListaEstabelecimento {
    PageSize: PageSize
    csicp_bb001: csicp_bb001[]
}

export interface PageSize {
    cs_list_total_itens: number
    cs_itens_per_page: string
    cs_number_of_pages: number
}




export interface csicp_bb001 {
    ID: string
    BB001_NomeFantasia: string
}







</script>
