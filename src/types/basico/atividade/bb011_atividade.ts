export interface AtividadeSimples {
    PageSize: PageSize;
    csicp_bb011: Csicp_bb011[];
    Code_Erro: Code_Erro;
}

export interface PageSize {
    cs_list_total_itens: number;
    cs_itens_per_page: string;
    cs_number_of_pages: number;
}

export interface Csicp_bb011 {
    ID: string;
    BB011_Codigo: number;
    BB011_Atividade: string;
    BB011_Is_Active: boolean;
}

export interface Code_Erro {
    Code_Erro: string;
    Mensagem: string;
}

export interface ApiResponse<T> {
    csicp_bb011: { ID: string; BB011_Codigo: number; BB011_Atividade: string; BB011_Is_Active: boolean }[];
    PageSize: any;
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
