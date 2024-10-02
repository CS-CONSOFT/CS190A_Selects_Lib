export interface ComboPaises {
    csicp_aa025: Csicp_aa025[];
    Code_Erro: Code_Erro;
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

export interface Code_Erro {
    Code_Erro: string;
    Mensagem: string;
}

export interface ApiResponseAA025Combo<T> {
    csicp_aa025: {
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
    }[];
    PageSize: any;
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
