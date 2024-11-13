export interface TpCobranca {
    PageSize: PageSize;
    Lista_bb009: Lista_bb009[];
    Code_Erro: Code_Erro;
}

export interface PageSize {
    cs_list_total_itens: number;
    cs_itens_per_page: string;
    cs_number_of_pages: number;
}

export interface Lista_bb009 {
    ID: string;
    BB009_Filial: number;
    BB009_Codigo: number;
    BB009_TipoCobranca: string;
    EmpresaID: string;
    BB009_IsActive: boolean;
}

export interface Code_Erro {
    Code_Erro: string;
    Mensagem: string;
}

export interface ApiResponse<T> {
    Lista_bb009: { ID: string; BB009_Filial: number; BB009_Codigo: number; BB009_TipoCobranca: string; EmpresaID: string; BB009_IsActive: boolean; }[];
    PageSize: any;
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
