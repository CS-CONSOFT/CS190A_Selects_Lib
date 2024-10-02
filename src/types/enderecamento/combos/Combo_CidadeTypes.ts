export interface ComboCidades {
    Lista_csicp_aa028: Lista_csicp_aa028[];
    Code_Erro: Code_Erro;
}

export interface Lista_csicp_aa028 {
    csicp_aa028: Csicp_aa028;
    csicp_aa027: Csicp_aa027;
    csicp_statica_UFBrasil: Csicp_statica_UFBrasil;
    csicp_statica_ZonaFranca: Csicp_statica_ZonaFranca;
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

export interface Csicp_statica_UFBrasil {
    Id: number;
    Label: string;
    TipoRegistro: number;
    Order: number;
}

export interface Csicp_statica_ZonaFranca {
    Id: number;
    Label: string;
    TipoRegistro: number;
    Order: number;
}

export interface Code_Erro {
    Code_Erro: string;
    Mensagem: string;
}

export interface ApiResponseAA028Combo<T> {
    Lista_csicp_aa028: any;
    PageSize: any;
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
