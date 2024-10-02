export interface ComboCentroDeCusto {
    PageSize: PageSize;
    Lista_bb005: Lista_bb005[];
    Code_Erro: Code_Erro;
}

export interface PageSize {
    cs_list_total_itens: number;
    cs_itens_per_page: string;
    cs_number_of_pages: number;
}

export interface Lista_bb005 {
    csicp_bb005: Csicp_bb005;
}

export interface Csicp_bb005 {
    ID: string;
    BB005_Filial: number;
    BB005_Codigo: number;
    BB005_NomeCCusto: string;
    BB005_ColunaImpressao: number;
    EmpresaId: string;
    BB005_IsActive: boolean;
}

export interface Code_Erro {
    Code_Erro: string;
    Mensagem: string;
}

export interface ApiResponse<T> {
    Lista_bb005: any;
    PageSize: any;
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
