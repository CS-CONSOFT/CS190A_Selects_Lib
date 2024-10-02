export interface ComboRegioes {
    csicp_aa026: Csicp_aa026[];
    Code_Erro: Code_Erro;
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

export interface ApiResponse<T> {
    PageSize: any;
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
