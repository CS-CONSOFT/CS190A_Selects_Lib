export interface EspecieCompleto {
    PageSize: PageSize;
    csicp_ff003_List: Csicp_ff003_List[];
    Code_Erro: Code_Erro;
}

export interface PageSize {
    cs_list_total_itens: number;
    cs_itens_per_page: string;
    cs_number_of_pages: number;
}

export interface Csicp_ff003_List {
    Id: string;
    FF003_FilialID: string;
    FF003_TipoEspecie: number;
    FF003_Codigo: number;
    FF003_Descricao: string;
    FF003_DescResumida: string;
    FF003_PFX: string;
    FF003_Provisao: number;
    FF003_CCustoID: string;
    FF003_LctoEntTitulosID: string;
    FF003_LctoBxNormalID: string;
    FF003_LctoBxDevolucaoID: string;
    FF003_SeqNroTitulo: number;
}

export interface Code_Erro {
    Code_Erro: string;
    Mensagem: string;
}

export interface ApiResponse<T> {
    csicp_ff003_List: {
        Id: string;
        FF003_FilialID: string;
        FF003_TipoEspecie: number;
        FF003_Codigo: number;
        FF003_Descricao: string;
        FF003_DescResumida: string;
        FF003_PFX: string;
        FF003_Provisao: number;
        FF003_CCustoID: string;
        FF003_LctoEntTitulosID: string;
        FF003_LctoBxNormalID: string;
        FF003_LctoBxDevolucaoID: string;
        FF003_SeqNroTitulo: number;
    }[];
    PageSize: any;
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
