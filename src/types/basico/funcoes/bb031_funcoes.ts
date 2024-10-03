export interface FuncoesCompleto {
    PageSize: PageSize;
    Lista_bb031: Lista_bb031[];
    Code_Erro: Code_Erro;
}

export interface PageSize {
    cs_list_total_itens: number;
    cs_itens_per_page: string;
    cs_number_of_pages: number;
}

export interface Lista_bb031 {
    csicp_bb031: Csicp_bb031;
}

export interface Csicp_bb031 {
    ID: string;
    BB031_CodgFuncaoID: number;
    BB031_Descricao: string;
    BB031_CBO: string;
    BB031_IsActive: boolean;
}

export interface Code_Erro {
    Code_Erro: string;
    Mensagem: string;
}

export interface ApiResponse<T> {
    Lista_bb031: any;
    PageSize: any;
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
