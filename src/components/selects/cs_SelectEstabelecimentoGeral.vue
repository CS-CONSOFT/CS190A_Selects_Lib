<template>
    <v-select v-model="selectedItem" :items="formattedList" item-value="value" item-text="title" variant="solo-filled"
        hide-details @change="emitSelection" class="custom-select">
        <template v-slot:label>
            <span class="d-flex align-center"
                style="font-size: 12px; font-weight: 500; padding-bottom: 0.1em; color: #808080">
                {{ computedLabel }}<span v-if="props.Prm_isObrigatorio" class="text-error">*</span>
            </span>
        </template>
    </v-select>
</template>

<script setup lang="ts">
import { URLBase } from '@/services/configuracoes_axios';
import axios from 'axios';
import { computed, onMounted, ref, watch } from 'vue';
import { getUserFromLocalStorage } from '../../utils/getUserStorage';

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
const RESPONSE = ref<IGetListaEstabelecimento>();
const selectedItem = ref<string | null>(props.modelValue);

const computedLabel = computed(() => props.Prm_etiqueta);

const formattedList = computed(() => {
    return RESPONSE.value?.Estabelecimento.Estabelecimentos!.map((item) => ({
        title: item.csicp_bb001.BB001_NomeFantasia,
        value: item.csicp_bb001.ID
    }));
});

// Função para buscar as unidades federativas baseado no ID do país
const fetch = async () => {
    try {
        const header = {
            tenant_id: tenant,
            In_IsCount: 0,
            In_IsActive: true,
            in_search: "",
            in_currentPage: 1,
            in_pageSize: 99999
        }

        const _response = await axios.get(`${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb001_Get_List_Estabelecimento`, {
            headers: header
        })
        const res = _response.data as IGetListaEstabelecimento
        if (res) {
            const selected = res.Estabelecimento.Estabelecimentos.find((val) => val.csicp_bb001.ID === props.modelValue);
            if (selected) {
                selectedItem.value = selected.csicp_bb001.ID;
            }
        }
    } catch (error) {
        console.error('Erro ao buscar dado:', error);
    }
};


watch(selectedItem, (newVal) => {
    emit('update:modelValue', newVal);
});

onMounted(() => {
    fetch()
})


function emitSelection() {
    emit('update:modelValue', selectedItem.value);
}









//INTERFACE
export interface IGetListaEstabelecimento {
    PageSize: PageSize
    Estabelecimento: Estabelecimento
    Code_Erro: Code_Erro
}

export interface PageSize {
    cs_list_total_itens: number
    cs_itens_per_page: string
    cs_number_of_pages: number
}

export interface Estabelecimento {
    Estabelecimentos: IGetEstabelecimentoItem[]
}

export interface IGetEstabelecimentoItem {
    csicp_bb001: Csicp_bb001
    RamoEstab: RamoEstab
    Idioma: Idioma
    csicp_bb001_CapMun: Csicp_bb001_CapMun
    Endereco: Endereco
    SimplesNacional: SimplesNacional[]
    CNAE: CNAE[]
    ContatoXML: ContatoXML[]
    ConfiguracoesFiscais: ConfiguracoesFiscais[]
    Imagens_List: Imagens[]
}

export interface Imagens {
    csicp_bb001_Img: Csicp_bb001_Img
    csicp_bb001_Staimg: Csicp_bb001_Staimg
}

export interface Csicp_bb001_Img {
    Id: string
    EmpresaId: string
    Status: number
    Nome: string
    Tipo: string
    Imagem: string
    IsActive: boolean
    FILENAME: string
    Path: string
}

export interface Csicp_bb001_Staimg {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb001 {
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

export interface RamoEstab {
    Id: number
    Label: string
    TipoRegistro: number
    Order: number
}

export interface Idioma {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb001_CapMun {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Endereco {
    Pais: Pais
    UF: UF
    Cidade: Cidade
}

export interface Pais {
    Id: string
    AA025_CodigoPais: number
    AA025_Descricao: string
    AA025_CodigoBACEN: number
    AA025_CodigoSISCOMEX: number
    AA025_IsActive: boolean
    AA025_Nacionalidade: string
    AA025_ISO_3166_A2: string
    AA025_ISO_3166_A3: string
    AA025_ISO_3166_N3: number
    AA025_Export_PaisID: string
    AA025_Codigo_NacoesUnidas: number
}

export interface UF {
    Id: string
    AA027_Sigla: string
    Descricao: string
    AA027_PercICMSContrib: number
    AA027_PercICMSNContrib: number
    AA027_PercSubstTribut: number
    AA027_MascInsEstadual: string
    AA027_PercICMSEntrada: number
    AA027_MascIEImpressao: string
    AA027_CodigoIBGE: number
    PaisId: string
    RegiaoId: string
    AA027_Naturalidade: string
    AA027_Export_UFId: string
    AA025_Export_PaisID: string
    AA026_Export_RegiaoID: string
}

export interface Cidade {
    Id: string
    AA028_Cidade: string
    AA028_PercICMSContrib: number
    A028_PercICMSNContrib: number
    A028_PercSubstTribut: number
    A028_MascInsEstadual: string
    A028_PercICMSEntrada: number
    A028_MascIEImpressao: string
    AA028_CodgIBGE: number
    AA028_ZonaFranca: number
    AA028_EstadoBrasil: number
    UFId: string
    AA028_Export_CidadeID: string
    AA027_Export_UFID: string
}

export interface SimplesNacional {
    SimplesNac: SimplesNac
    Aliquotas: Aliquotas
}

export interface SimplesNac {
    BB001_SIMPLES_Id: string
    BB001_id: string
    BB001_SIMPLESPart_ID: number
    BB001_Aliq_SIMPLES: number
    BB001_Aliq_IRPJ: number
    BB001_Aliq_CSLL: number
    BB001_Aliq_COFINS: number
    BB001_Aliq_PIS_PASEP: number
    BB001_Aliq_CPP: number
    BB001_Aliq_ICMS: number
    BB001_Aliq_IPI: number
    BB001_Aliq_ISS: number
}

export interface Aliquotas {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface CNAE {
    Estab_CNAES: Estab_CNAES
    CNAEs: CNAEs
}

export interface Estab_CNAES {
    bb001_PK_Id: string
    bb001_ID: string
    bb001_cnae_ID: string
    bb001_IsActive: boolean
    bb001_IsCNAE_Fiscal: boolean
}

export interface CNAEs {
    aa029_Id: string
    aa029_CNAE: string
    aa029_Descricao: string
    aa029_NotaExplicativa: string
    aa029_IsActive: boolean
}

export interface ContatoXML {
    csicp_bb001_xml: Csicp_bb001_xml
}

export interface Csicp_bb001_xml {
    bb001a_Id: number
    bb001a_EstabID: string
    bb001a_Nome: string
    bb001a_email: string
    bb001a_Telefone: string
    bb001a_CpfCNPJ: string
    bb001a_IsCPF: boolean
}

export interface ConfiguracoesFiscais {
    csicp_bb001_CfgFis: Csicp_bb001_CfgFis
    csicp_aa030_Regime: Csicp_aa030_Regime
    csicp_bb001_AtPj: Csicp_bb001_AtPj
    csicp_bb001_TpTri: Csicp_bb001_TpTri
    csicp_bb001_NatPj: Csicp_bb001_NatPj
}

export interface Csicp_bb001_CfgFis {
    BB001_Cfg_Id: string
    BB001_Empresa_ID: string
    BB001_TpTributacao_ID: number
    BB001_Perc_ICMS: number
    BB001_Perc_CSLL_BC: number
    BB001_Perc_CSLL_BC_Servico: number
    BB001_Perc_IRPJ_BC: number
    BB001_Perc_IRPJ_BC_Servico: number
    BB001_NaturezaPJ_ID: number
    BB001_TpAtividade_ID: number
    BB001_RegimeTributarioID: number
}

export interface Csicp_aa030_Regime {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    CRT_Digito: string
}

export interface Csicp_bb001_AtPj {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    CodigoFiscal: string
    LabelGrande: string
}

export interface Csicp_bb001_TpTri {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
}

export interface Csicp_bb001_NatPj {
    Id: number
    Label: string
    Order: number
    Is_Active: boolean
    CodigoFiscal: string
    LabelGrande: string
}

export interface Code_Erro {
    Code_Erro: string
    Mensagem: string
}


export interface ISaveBB001Cnae {
    bb001_id: string
    aa029_id: string
}


export interface ISaveBB001SPLS {
    BB001_SIMPLES_Id: string
    BB001_id: string
    BB001_SIMPLESPart_ID: number
    BB001_Aliq_SIMPLES: number
    BB001_Aliq_IRPJ: number
    BB001_Aliq_CSLL: number
    BB001_Aliq_COFINS: number
    BB001_Aliq_PIS_PASEP: number
    BB001_Aliq_CPP: number
    BB001_Aliq_ICMS: number
    BB001_Aliq_IPI: number
    BB001_Aliq_ISS: number
}








</script>
