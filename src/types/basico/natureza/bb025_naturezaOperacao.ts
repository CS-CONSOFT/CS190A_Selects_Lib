export interface NaturezaCompleto {
    PageSize: PageSize;
    Lista_bb025_Completo: Lista_bb025_Completo[];
    Code_Erro: Code_Erro;
}

export interface PageSize {
    cs_list_total_itens: number;
    cs_itens_per_page: string;
    cs_number_of_pages: number;
}

export interface Lista_bb025_Completo {
    Lista_bb025: Lista_bb025;
    naturezaCFOP: NaturezaCFOP[];
}

export interface Lista_bb025 {
    csicp_bb025: Csicp_bb025;
    csicp_bb001: Csicp_bb001;
    sped_in_doc_ICMS: Sped_in_doc_ICMS;
}

export interface Csicp_bb025 {
    ID: string;
    BB025_Filial: number;
    BB025_Codigo: string;
    BB025_Descricao: string;
    BB025_Gera_Duplicata: number;
    BB025_Usa_Tabela_Preco: number;
    BB025_CodTpTransacao: number;
    BB025_TransacaoID: string;
    BB025_Grupo_Contabil: number;
    BB025_ModDoctoFiscal: string;
    BB025_CFOPDentroEstado: string;
    BB025_CFOPForaEstado: string;
    BB025_BaixaEstoque: number;
    EmpresaID: string;
    BB025_IsActive: boolean;
    BB025_ModDoctoFiscal_ID: number;
    bb025_ValorizarPrecoID: number;
}

export interface Csicp_bb001 {
    ID: string;
    BB001_CodigoEmpresa: number;
    BB001_RazaoSocial: string;
    BB001_Endereco: string;
    BB001_Complemento: string;
    BB001_NumResidencial: string;
    BB001_Bairro: string;
    BB001_CEP: number;
    BB001_CNPJ: number;
    BB001_InscEstadual: string;
    BB001_InscJunta: number;
    BB001_DataInscricao: string;
    BB001_NomeFantasia: string;
    BB001_Telefone: string;
    BB001_Fax: string;
    BB001_SlogamEmpresa1: string;
    BB001_SlogamEmpresa2: string;
    BB001_Email: string;
    BB001_HomePage: string;
    BB001_RamoEmpresa: number;
    BB002_GrupoEmpresa: string;
    BB001_CodgClienteAux: number;
    BB001_AlmoxPadrao: number;
    BB001_AlmoxTransfer: number;
    BB001_BDDistribuida: number;
    BB001_CNAEFiscal: number;
    BB001_SUFRAMAEmp: string;
    BB001_InscMunicipal: string;
    BB001_PaisID: string;
    CidadeId: string;
    BB001_UFID: string;
    BB001_NomeOficial: string;
    BB001_CPF_Oficial: number;
    BB001_CodgCartorio: number;
    BB001_NomeSubstituto: string;
    BB001_DescricaoOficial: string;
    BB001_CapitalMunicipio: number;
    bb001_Cor1_Hexa: string;
    bb001_Cor2_Hexa: string;
    BB001_Idioma_ID: number;
    BB001_IsActive: boolean;
    BB001_Token: string;
    BB001_UsuarioSIRC: string;
    BB001_SenhaSIRC: string;
    BB001_TenantFiscal: number;
    bb001_Token_eSitef: string;
    bb001_URL_GooglePlay: string;
    bb001_URL_AppStore: string;
    bb001_CIX: string;
    BB001_Chave_APL: string;
    BB001_Aut_Token: string;
    BB001_Token_CSPIX: string;
}

export interface Sped_in_doc_ICMS {
    Id: number;
    Label: string;
    Codigo: string;
    Order: number;
    Is_Active: boolean;
    Cupom: boolean;
    DocFiscal: boolean;
}

export interface NaturezaCFOP {
    csicp_bb024: Csicp_bb024;
    sped_in_CFOP: Sped_in_CFOP;
}

export interface Csicp_bb024 {
    bb024_Id: number;
    bb025_NatOperacao_Id: string;
    bb024_CFOP_id: number;
}

export interface Sped_in_CFOP {
    Id: number;
    Codigo: string;
    Descricao: string;
    Is_Active: boolean;
    Order: number;
}

export interface Code_Erro {
    Code_Erro: string;
    Mensagem: string;
}

export interface ApiResponseNatureza<T> {
    Lista_bb025_Completo: any;
    PageSize: any;
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
