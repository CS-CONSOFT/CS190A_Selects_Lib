export interface GetCNAEList {
    PageSize: PageSize
    csicp_aa029_List: Csicp_aa029_ListItem[]
    Code_Erro: Code_Erro
}

export interface PageSize {
    cs_list_total_itens: number
    cs_itens_per_page: string
    cs_number_of_pages: number
}

export interface Csicp_aa029_ListItem {
    aa029_Id: string
    aa029_CNAE: string
    aa029_Descricao: string
    aa029_NotaExplicativa: string
    aa029_IsActive: boolean
}

export interface Code_Erro {
    Code_Erro: string
    Mensagem: string
}

export interface IInsertCnae {
    aa029_Id: string
    aa029_CNAE: string
    aa029_Descricao: string
    aa029_NotaExplicativa: string
    aa029_IsActive: boolean
}

export interface GetCnaeById {
    csicp_aa029: Csicp_aa029
}

export interface Csicp_aa029 {
    aa029_Id: string
    aa029_CNAE: string
    aa029_Descricao: string
    aa029_NotaExplicativa: string
    aa029_IsActive: boolean
}