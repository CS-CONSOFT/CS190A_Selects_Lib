export interface FormaPagamentoCompleto {
    PageSize: PageSize;
    Lista_bb026_Completo: Lista_bb026_Completo[];
    Code_Erro: Code_Erro;
}

export interface PageSize {
    cs_list_total_itens: number;
    cs_itens_per_page: string;
    cs_number_of_pages: number;
}

export interface Lista_bb026_Completo {
    csicp_bb026: Csicp_bb026;
    FatoresAcrescimos: FatoresAcrescimos[];
    FatoresCartaoCredito: FatoresCartaoCredito[];
}

export interface Csicp_bb026 {
    csicp_bb026: Csicp_bb0262;
    csicp_bb008: Csicp_bb008;
    csicp_bb019: Csicp_bb019;
    csicp_bb026_Classe: Csicp_bb026_Classe;
    csicp_bb026_Tipo: Csicp_bb026_Tipo;
    csicp_bb026_Vin: Csicp_bb026_Vin;
    csicp_ff003_TpEsp: Csicp_ff003_TpEsp;
    csicp_statica_BB026_DadosCartaoSN: Csicp_statica_BB026_DadosCartaoSN;
    csicp_statica_BB026_DadosChequeSN: Csicp_statica_BB026_DadosChequeSN;
    csicp_statica_BB026_VincCupomFiscal: Csicp_statica_BB026_VincCupomFiscal;
}

export interface Csicp_bb0262 {
    ID: string;
    EmpresaID: string;
    BB026_Filial: number;
    BB026_Codigo: number;
    BB026_FormaPagamento: string;
    BB026_DadosChequeSN: number;
    BB026_DadosCartaoSN: number;
    BB026_VincCupomFiscal: number;
    BB026_Classificacao: number;
    BB026_CRPlanoContaID: string;
    BB026_DBPlanoContaID2: string;
    BB026_NRO_Autenticacoes: number;
    BB026_Valor_Minimo: number;
    BB026_Valor_Maximo: number;
    BB026_Troco_Maximo: number;
    BB026_PontoSangria: number;
    BB026_Tipo: number;
    BB026_ParcelaPorDepto: boolean;
    BB026_CondPagtoFixoID: string;
    BB026_AdministradoraID: string;
    BB026_Utiliza_PINPAD: boolean;
    BB026_ConsultaCheque: boolean;
    BB026_ImpressaoCheque: boolean;
    BB026_ChequeBomPara: boolean;
    BB026_SolicitaEmitente: boolean;
    BB026_SolicitaQtd: boolean;
    BB026_SolicitaCondPagto: boolean;
    BB026_AceitaPagto: boolean;
    BB026_AceitaRecebimento: boolean;
    BB026_CapturaRecebPVPDV: boolean;
    BB026_PermiteTroco: boolean;
    BB026_SangriaAutomatica: boolean;
    BB026_NaoAbreGaveta: boolean;
    BB026_TipoVinculo_ID: number;
    BB026_IsActive: boolean;
    BB026_Classe_Id: number;
    BB026_Especie_ID: string;
    BB026_MeioPagtoImpFiscal: string;
    BB026_TipoEspecie: number;
    BB026_pComissaoVend: number;
    BB026_AceitaVPresente: boolean;
    BB026_IsLibEntregaLiq: boolean;
    bb026_IsAplicaAprovCond: boolean;
    bb026_IsAgrupa: boolean;
}

export interface Csicp_bb008 {
    ID: string;
    EmpresaID: string;
    BB008_Filial: number;
    BB008_Codigo: number;
    BB008_Condicao_Pagto: string;
    BB008_Tipo: number;
    BB008_Condicao: string;
    BB008_CodFormaPagto: number;
    BB008_VlrMaxFormaPagto: number;
    BB008_VlrMinFormaPagto: number;
    BB008_EntLiquidada: number;
    BB008_ParcLiquidadas: number;
    BB008_Aprova_Venda: number;
    BB008_Perc_Acrescimo: number;
    BB008_Perc_Desconto: number;
    BB008_IndPrecoVenda: number;
    BB008_PercEntrada: number;
    BB008_ValorAcrescimo: number;
    BB008_FatorJuros: number;
    BB008_IsActive: boolean;
    BB008_tipoID: number;
    BB008_QtdParcela: number;
}

export interface Csicp_bb019 {
    ID: string;
    EmpresaID: string;
    BB019_Filial: number;
    BB019_Codigo: number;
    BB019_Administradora: string;
    BB019_Taxa_de_Cobranca: number;
    BB019_VenctoPadrao: number;
    BB019_ContaID: string;
    BB019_UsaFatorAcresc: number;
    BB019_FinanProprio: number;
    BB019_TAC: number;
    BB019_Email: string;
    BB019_HomePage: string;
    BB019_TipoFinanc_ID: number;
    BB019_IsActive: boolean;
    BB019_DiaLimiteVenctoPadrao: number;
    BB019_CodigoCredenciadora: string;
    BB019_Logo_Adm: string;
    BB019_Filename: string;
}

export interface Csicp_bb026_Classe {
    Id: number;
    Label: string;
    Imagem: string;
    Order: number;
    Is_Active: boolean;
    tPag: string;
    UsoCS: string;
    URL_FormaPagto: string;
}

export interface Csicp_bb026_Tipo {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb026_Vin {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_ff003_TpEsp {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
    ID_PDV: number;
}

export interface Csicp_statica_BB026_DadosCartaoSN {
    Id: number;
    Label: string;
    TipoRegistro: number;
    Order: number;
}

export interface Csicp_statica_BB026_DadosChequeSN {
    Id: number;
    Label: string;
    TipoRegistro: number;
    Order: number;
}

export interface Csicp_statica_BB026_VincCupomFiscal {
    Id: number;
    Label: string;
    TipoRegistro: number;
    Order: number;
}

export interface FatoresAcrescimos {
    csicp_bb017: Csicp_bb017;
    csicp_bb008: Csicp_bb0082;
    csicp_pd001_cTef_Cmd_Tef_Canc_ID: Csicp_pd001_cTef_Cmd_Tef_Canc_ID;
    csicp_pd001_cTef_Cmd_Tef_VD_ID: Csicp_pd001_cTef_Cmd_Tef_VD_ID;
    csicp_statica_BB017_EntLiquidada: Csicp_statica_BB017_EntLiquidada;
    csicp_statica_BB017_ParcLiquidadas: Csicp_statica_BB017_ParcLiquidadas;
}

export interface Csicp_bb017 {
    BB017_Id: string;
    BB017_EMPRESAID: string;
    BB017_FPagtoID: string;
    BB017_CondicaoID: string;
    BB017_FatorAcrescimo: number;
    BB017_FatorSemEntrada: number;
    BB017_Ordem: number;
    BB017_Cmd_Tef_VD_ID: number;
    BB017_Cmd_Tef_Canc_ID: number;
    BB017_ParcLiquidadas: number;
    BB017_EntLiquidada: number;
    BB017_vAcimaDe: number;
}

export interface Csicp_bb0082 {
    ID: string;
    EmpresaID: string;
    BB008_Filial: number;
    BB008_Codigo: number;
    BB008_Condicao_Pagto: string;
    BB008_Tipo: number;
    BB008_Condicao: string;
    BB008_CodFormaPagto: number;
    BB008_VlrMaxFormaPagto: number;
    BB008_VlrMinFormaPagto: number;
    BB008_EntLiquidada: number;
    BB008_ParcLiquidadas: number;
    BB008_Aprova_Venda: number;
    BB008_Perc_Acrescimo: number;
    BB008_Perc_Desconto: number;
    BB008_IndPrecoVenda: number;
    BB008_PercEntrada: number;
    BB008_ValorAcrescimo: number;
    BB008_FatorJuros: number;
    BB008_IsActive: boolean;
    BB008_tipoID: number;
    BB008_QtdParcela: number;
}

export interface Csicp_pd001_cTef_Cmd_Tef_Canc_ID {
    Id: number;
    TipoTEF_ID: number;
    Codigo: string;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_pd001_cTef_Cmd_Tef_VD_ID {
    Id: number;
    TipoTEF_ID: number;
    Codigo: string;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_statica_BB017_EntLiquidada {
    Id: number;
    Label: string;
    TipoRegistro: number;
    Order: number;
}

export interface Csicp_statica_BB017_ParcLiquidadas {
    Id: number;
    Label: string;
    TipoRegistro: number;
    Order: number;
}

export interface FatoresCartaoCredito {
    csicp_bb020: Csicp_bb020;
    csicp_bb008: Csicp_bb0082;
}

export interface Csicp_bb020 {
    ID: string;
    EmpresaID: string;
    BB019_ID: string;
    BB008_CondicaodePagamentoId: string;
    bb020_tCobCartao: number;
    BB020_FPagtoID: string;
}

export interface Csicp_bb0082 {
    ID: string;
    EmpresaID: string;
    BB008_Filial: number;
    BB008_Codigo: number;
    BB008_Condicao_Pagto: string;
    BB008_Tipo: number;
    BB008_Condicao: string;
    BB008_CodFormaPagto: number;
    BB008_VlrMaxFormaPagto: number;
    BB008_VlrMinFormaPagto: number;
    BB008_EntLiquidada: number;
    BB008_ParcLiquidadas: number;
    BB008_Aprova_Venda: number;
    BB008_Perc_Acrescimo: number;
    BB008_Perc_Desconto: number;
    BB008_IndPrecoVenda: number;
    BB008_PercEntrada: number;
    BB008_ValorAcrescimo: number;
    BB008_FatorJuros: number;
    BB008_IsActive: boolean;
    BB008_tipoID: number;
    BB008_QtdParcela: number;
}

export interface Code_Erro {
    Code_Erro: string;
    Mensagem: string;
}

export interface ApiResponseFormaPagamento<T> {
    Lista_bb026_Completo: any;
    PageSize: any;
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
