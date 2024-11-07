export interface CategoriaSimples {
    PageSize: PageSize;
    Lista_bb029: Lista_bb029[];
    Code_Erro: Code_Erro;
}

export interface PageSize {
    cs_list_total_itens: number;
    cs_itens_per_page: string;
    cs_number_of_pages: number;
}

export interface Lista_bb029 {
    ID: string;
    BB029_CodgCategoria: number;
    BB029_Categoria: string;
    BB029_Is_Active: boolean;
}

export interface Code_Erro {
    Code_Erro: string;
    Mensagem: string;
}

export interface ApiResponse<T> {
    Lista_bb029: { ID: string; BB029_CodgCategoria: number; BB029_Categoria: string; BB029_Is_Active: boolean }[];
    PageSize: any;
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
