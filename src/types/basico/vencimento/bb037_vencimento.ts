export interface VencimentoCompleto {
    PageSize: PageSize;
    Lista_bb037: Lista_bb037[];
    Code_Erro: Code_Erro;
}

export interface PageSize {
    cs_list_total_itens: number;
    cs_itens_per_page: string;
    cs_number_of_pages: number;
}

export interface Lista_bb037 {
    csicp_bb037: Csicp_bb037;
}

export interface Csicp_bb037 {
    Id: string;
    bb037_Codigo: string;
    bb037_Descricao: string;
    bb037_Dia: number;
    bb037_QtdDiasMCompra: number;
    bb037_IsActive: boolean;
}

export interface Code_Erro {
    Code_Erro: string;
    Mensagem: string;
}

export interface ApiResponse<T> {
    Lista_bb037: { csicp_bb037: { Id: string; bb037_Codigo: string; bb037_Descricao: string; bb037_Dia: number; bb037_QtdDiasMCompra: number; bb037_IsActive: boolean; }; }[];
    PageSize: any;
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
