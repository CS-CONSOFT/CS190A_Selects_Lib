export interface ComboCondicaoPagto {
    PageSize: PageSize;
    Lista_bb008: Lista_bb008[];
    Code_Erro: Code_Erro;
}

export interface PageSize {
    cs_list_total_itens: number;
    cs_itens_per_page: string;
    cs_number_of_pages: number;
}

export interface Lista_bb008 {
    ID: string;
    EmpresaID: string;
    BB008_Filial: number;
    BB008_Codigo: number;
    BB008_Condicao_Pagto: string;
    BB008_Tipo: number;
    BB008_Condicao: string;
    BB008_CodFormaPagto: number;
    BB008_VlrMaxFormaPagto: number;
    BB008_VlrMinFormaPagto: number;
    BB008_EntLiquidada: number;
    BB008_ParcLiquidadas: number;
    BB008_Aprova_Venda: number;
    BB008_Perc_Acrescimo: number;
    BB008_Perc_Desconto: number;
    BB008_IndPrecoVenda: number;
    BB008_PercEntrada: number;
    BB008_ValorAcrescimo: number;
    BB008_FatorJuros: number;
    BB008_IsActive: boolean;
    BB008_tipoID: number;
    BB008_QtdParcela: number;
}

export interface Code_Erro {
    Code_Erro: string;
    Mensagem: string;
}

export interface ApiResponseBB008Combo<T> {
    Lista_bb008: {
        ID: string;
        EmpresaID: string;
        BB008_Filial: number;
        BB008_Codigo: number;
        BB008_Condicao_Pagto: string;
        BB008_Tipo: number;
        BB008_Condicao: string;
        BB008_CodFormaPagto: number;
        BB008_VlrMaxFormaPagto: number;
        BB008_VlrMinFormaPagto: number;
        BB008_EntLiquidada: number;
        BB008_ParcLiquidadas: number;
        BB008_Aprova_Venda: number;
        BB008_Perc_Acrescimo: number;
        BB008_Perc_Desconto: number;
        BB008_IndPrecoVenda: number;
        BB008_PercEntrada: number;
        BB008_ValorAcrescimo: number;
        BB008_FatorJuros: number;
        BB008_IsActive: boolean;
        BB008_tipoID: number;
        BB008_QtdParcela: number;
    }[];
    PageSize: any;
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
