export interface GruposCompleto {
    PageSize: PageSize;
    Grupo_List: Grupo_List[];
    Code_Erro: Code_Erro;
}

export interface PageSize {
    cs_list_total_itens: number;
    cs_itens_per_page: string;
    cs_number_of_pages: number;
}

export interface Grupo_List {
    Id: string;
    SY002_Grupo: string;
    SY002_Descricao: string;
}

export interface Code_Erro {
    Code_Erro: string;
    Mensagem: string;
}

export interface ApiResponseGrupos<T> {
    PageSize: any;
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
