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
const formattedList = ref<{ title: string, value: string }[]>([{ title: 'Carregando...', value: '' }]);
const loading = ref(false);


// Função para buscar as unidades federativas baseado no ID do país
const fetch = async () => {
    loading.value = true
    try {
        const header = {
            tenant_id: tenant,
            In_IsCount: 0,
            In_IsActive: true,
            in_search: "",
            in_currentPage: 1,
            in_pageSize: 999
        }

        const _response = await axios.get(`${URLBase}CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb001_Get_List_Estabelecimento_Simples`, {
            headers: header
        })
        //@ts-ignore
        const res = _response as IGetListaEstabelecimento;
        formattedList.value = res.csicp_bb001.map((item) => ({
            title: item.BB001_NomeFantasia,
            value: item.ID
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
    BB001_CodigoEmpresa: number
    BB001_RazaoSocial: string
    BB001_Endereco: string
    BB001_Complemento: string
    BB001_NumResidencial: string
    BB001_Bairro: string
    BB001_CEP: number
    BB001_CNPJ: number
    BB001_InscEstadual: string
    BB001_InscJunta: number
    BB001_DataInscricao: string
    BB001_NomeFantasia: string
    BB001_Telefone: string
    BB001_Fax: string
    BB001_SlogamEmpresa1: string
    BB001_SlogamEmpresa2: string
    BB001_Email: string
    BB001_HomePage: string
    BB001_RamoEmpresa: number
    BB002_GrupoEmpresa: string
    BB001_CodgClienteAux: number
    BB001_AlmoxPadrao: number
    BB001_AlmoxTransfer: number
    BB001_BDDistribuida: number
    BB001_CNAEFiscal: number
    BB001_SUFRAMAEmp: string
    BB001_InscMunicipal: string
    BB001_PaisID: string
    CidadeId: string
    BB001_UFID: string
    BB001_NomeOficial: string
    BB001_CPF_Oficial: number
    BB001_CodgCartorio: number
    BB001_NomeSubstituto: string
    BB001_DescricaoOficial: string
    BB001_CapitalMunicipio: number
    bb001_Cor1_Hexa: string
    bb001_Cor2_Hexa: string
    BB001_Idioma_ID: number
    BB001_IsActive: boolean
    BB001_Token: string
    BB001_UsuarioSIRC: string
    BB001_SenhaSIRC: string
    BB001_TenantFiscal: number
    bb001_Token_eSitef: string
    bb001_URL_GooglePlay: string
    bb001_URL_AppStore: string
    bb001_CIX: string
    BB001_Chave_APL: string
    BB001_Aut_Token: string
    BB001_Token_CSPIX: string
}







</script>
