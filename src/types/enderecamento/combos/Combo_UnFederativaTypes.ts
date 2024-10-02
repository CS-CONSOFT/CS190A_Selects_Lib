export interface ComboUF {
    Lista_csicp_aa027: Lista_csicp_aa027[];
    Code_Erro: Code_Erro;
}

export interface Lista_csicp_aa027 {
    csicp_aa027: Csicp_aa027;
    csicp_aa025: Csicp_aa025;
    csicp_aa026: Csicp_aa026;
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

export interface Csicp_aa025 {
    Id: string;
    AA025_CodigoPais: number;
    AA025_Descricao: string;
    AA025_CodigoBACEN: number;
    AA025_CodigoSISCOMEX: number;
    AA025_IsActive: boolean;
    AA025_Nacionalidade: string;
    AA025_ISO_3166_A2: string;
    AA025_ISO_3166_A3: string;
    AA025_ISO_3166_N3: number;
    AA025_Export_PaisID: string;
    AA025_Codigo_NacoesUnidas: number;
}

export interface Csicp_aa026 {
    Id: string;
    AA026_CodigoRegiao: number;
    AA026_Descricao: string;
    AA026_CodigoIBGE: number;
    AA026_Export_RegiaoID: string;
}

export interface Code_Erro {
    Code_Erro: string;
    Mensagem: string;
}

export interface ApiResponseAA027Combo<T> {
    Lista_csicp_aa027: any;
    csicp_aa027: {
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
    }[];
    PageSize: any;
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
