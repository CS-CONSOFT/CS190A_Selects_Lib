export interface CargoCompleto {
    PageSize: PageSize;
    Lista_bb032: Lista_bb032[];
    Code_Erro: Code_Erro;
}

export interface PageSize {
    cs_list_total_itens: number;
    cs_itens_per_page: string;
    cs_number_of_pages: number;
}

export interface Lista_bb032 {
    csicp_bb032: Csicp_bb032;
}

export interface Csicp_bb032 {
    ID: string;
    BB032_CodgCargoID: number;
    BB032_Cargo: string;
    BB032_IsActive: boolean;
}

export interface Code_Erro {
    Code_Erro: string;
    Mensagem: string;
}

export interface ApiResponse<T> {
    Lista_bb032: any;
    PageSize: any;
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
