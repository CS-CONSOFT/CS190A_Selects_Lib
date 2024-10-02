export interface AgenteCobradorCompleto {
    PageSize: PageSize;
    Lista_bb006_Completo: Lista_bb006_Completo[];
    Code_Erro: Code_Erro;
}

export interface PageSize {
    cs_list_total_itens: number;
    cs_itens_per_page: string;
    cs_number_of_pages: number;
}

export interface Lista_bb006_Completo {
    csicp_bb006: Csicp_bb006_Data;
}

export interface Csicp_bb006_Data {
    csicp_bb006: Csicp_bb006;
    csicp_aa027: Csicp_aa027;
    csicp_aa028: Csicp_aa028;
    csicp_bb001: Csicp_bb001;
    csicp_bb006_Banco: Csicp_bb006_Banco;
    csicp_bb009: Csicp_bb009;
    csicp_ff102_API_Banco: Csicp_ff102_API_Banco;
    csicp_bb006_MovtaTesouraria: Csicp_bb006_MovtaTesouraria;
    csicp_sy001: Csicp_sy001;
}

export interface Csicp_bb006 {
    ID: string;
    BB006_Filial: number;
    BB006_CodgBanco: number;
    BB006_Banco: string;
    BB006_NomeReduzido: string;
    BB006_NoBanco: number;
    BB006_Agencia: number;
    BB006_Agencia_DV: string;
    BB006_NoConta: number;
    BB006_ContaDV: string;
    BB006_DVAgenciaCC: string;
    BB006_Endereco: string;
    BairroId: string;
    CidadeId: string;
    BB006_Telefone: string;
    BB006_Fax: string;
    BB006_Email: string;
    BB006_HomePage: string;
    BB006_Contato: string;
    BB006_DiasRetencao: number;
    BB006_DiasRetencaoDesc: number;
    BB006_SaldoAtual: number;
    BB006_TxCobSimples: number;
    BB006_TxDesconto: number;
    BB006_ContaContabil: string;
    BB006_CodgHistorico: number;
    BB006_LimiteCredito: number;
    BB006_MsgBoleto: string;
    BB006_CodEmpresaBanco: string;
    BB006_NroSeqRemessa: number;
    BB006_PercComissao: number;
    BB006_MovtaTesouraria: number;
    BB006_NomeAgencia: string;
    BB006_Classificacao: number;
    BB006_CodGeracaoCRec: number;
    EmpresaId: string;
    BB006_TipoCobrancaID: string;
    UFId: string;
    BB006_IsActive: boolean;
    BB006_Banco_ID: number;
    BB006_CodCobrador_ID: string;
    BB006_API_ID: number;
}

export interface Csicp_aa027 {
    Id: string;
    AA027_Sigla: string;
    Descricao: string;
    AA027_PercICMSContrib: number;
    AA027_PercICMSNContrib: number;
    AA027_PercSubstTribut: number;
    AA027_MascInsEstadual: string;
    AA027_PercICMSEntrada: number;
    AA027_MascIEImpressao: string;
    AA027_CodigoIBGE: number;
    PaisId: string;
    RegiaoId: string;
    AA027_Naturalidade: string;
    AA027_Export_UFId: string;
    AA025_Export_PaisID: string;
    AA026_Export_RegiaoID: string;
}

export interface Csicp_aa028 {
    Id: string;
    AA028_Cidade: string;
    AA028_PercICMSContrib: number;
    A028_PercICMSNContrib: number;
    A028_PercSubstTribut: number;
    A028_MascInsEstadual: string;
    A028_PercICMSEntrada: number;
    A028_MascIEImpressao: string;
    AA028_CodgIBGE: number;
    AA028_ZonaFranca: number;
    AA028_EstadoBrasil: number;
    UFId: string;
    AA028_Export_CidadeID: string;
    AA027_Export_UFID: string;
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

export interface Csicp_bb006_Banco {
    Id: number;
    NroBanco: string;
    NomedoBanco: string;
    PaginanaInternet: string;
    DVBanco: string;
}

export interface Csicp_bb009 {
    ID: string;
    BB009_Filial: number;
    BB009_Codigo: number;
    BB009_TipoCobranca: string;
    EmpresaID: string;
    BB009_IsActive: boolean;
}

export interface Csicp_ff102_API_Banco {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb006_MovtaTesouraria {
    Id: number;
    Label: string;
    TipoRegistro: number;
    Order: number;
}

export interface Csicp_sy001 {
    Id: string;
    SY001_Usuario: string;
    SY001_Nome: string;
    SY001_Senha: string;
    SY001_Bloqueado: boolean;
    SY001_Data_Validade: string;
    SY001_AutAlterarSenha: number;
    SY001_AltSenhaPxLogin: number;
    SY001_Expira_Senha: number;
    SY001_SenhExpAposNDias: number;
    SY001_DtExpiracaoLogin: string;
    SY001_DeptoLotado: string;
    SY001_Cargo: string;
    SY001_Email: string;
    SY001_Imagem: string;
    SY001_DataUltimoAcesso: string;
    UserID: number;
    SY001_Idioma_ID: number;
    SY001_SenhaCS: string;
    SY001_Celular: string;
}

export interface Code_Erro {
    Code_Erro: string;
    Mensagem: string;
}
