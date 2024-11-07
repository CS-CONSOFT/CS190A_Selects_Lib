export interface ZonaSimples {
    PageSize: PageSize;
    Lista_bb010: Lista_bb010[];
    Code_Erro: Code_Erro;
}

export interface PageSize {
    cs_list_total_itens: number;
    cs_itens_per_page: string;
    cs_number_of_pages: number;
}

export interface Lista_bb010 {
    ID: string;
    BB010_Codigo: number;
    BB010_Zona: string;
    BB010_Cod_Vendedor: number;
    BB010_Col_Preco_Tabela: number;
    BB010_Banco01_ID: string;
    BB010_Banco02_ID: string;
    BB010_Banco03_ID: string;
    BB010_CCusto_ID: string;
    BB010_Km: number;
    BB010_Fone_Contato: string;
    BB010_Promotor: number;
    BB010_Observacao: string;
    BB010_Periodo_Rota: number;
    BB010_Periodo_Visita: number;
    BB010_Tabela_Preco: string;
    BB010_VendedorID: string;
    BB010_IsActive: boolean;
    BB010_TipoRotaID: number;
    bb010_CidadeID: string;
}

export interface Code_Erro {
    Code_Erro: string;
    Mensagem: string;
}

export interface ApiResponse<T> {
    Lista_bb010: {
        ID: string;
        BB010_Codigo: number;
        BB010_Zona: string;
        BB010_Cod_Vendedor: number;
        BB010_Col_Preco_Tabela: number;
        BB010_Banco01_ID: string;
        BB010_Banco02_ID: string;
        BB010_Banco03_ID: string;
        BB010_CCusto_ID: string;
        BB010_Km: number;
        BB010_Fone_Contato: string;
        BB010_Promotor: number;
        BB010_Observacao: string;
        BB010_Periodo_Rota: number;
        BB010_Periodo_Visita: number;
        BB010_Tabela_Preco: string;
        BB010_VendedorID: string;
        BB010_IsActive: boolean;
        BB010_TipoRotaID: number;
        bb010_CidadeID: string;
    }[];
    PageSize: any;
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
