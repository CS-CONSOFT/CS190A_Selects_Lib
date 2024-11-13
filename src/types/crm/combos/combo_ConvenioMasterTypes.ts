export interface ConvenioMasterCombo {
    PageSize: PageSize;
    ConvenioMaster: ConvenioMaster[];
    Code_Erro: Code_Erro;
}

export interface PageSize {
    cs_list_total_itens: number;
    cs_itens_per_page: string;
    cs_number_of_pages: number;
}

export interface ConvenioMaster {
    csicp_bb067: Csicp_bb067;
}

export interface Csicp_bb067 {
    bb067_Id: number;
    bb067_Codigo: string;
    bb067_Descricao: string;
}

export interface Code_Erro {
    Code_Erro: string;
    Mensagem: string;
}

export interface ApiResponse<T> {
    ConvenioMaster: { bb067_Id: number; bb067_Codigo: string; bb067_Descricao: string }[];
    PageSize: any;
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
