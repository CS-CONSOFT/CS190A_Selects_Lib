export interface AdministradoraCompleto {
    PageSize: PageSize;
    Lista_bb019_Completo: Lista_bb019_Completo[];
    Code_Erro: Code_Erro;
}

export interface PageSize {
    cs_list_total_itens: number;
    cs_itens_per_page: string;
    cs_number_of_pages: number;
}

export interface Lista_bb019_Completo {
    csicp_bb019: Csicp_bb019;
    csicp_bb019_Tipo: Csicp_bb019_Tipo;
    csicp_bb012: Csicp_bb012;
    csicp_statica_FinancProprio: Csicp_statica_FinancProprio;
    csicp_statica_UsaFatorAcresc: Csicp_statica_UsaFatorAcresc;
}

export interface Csicp_bb019 {
    ID: string;
    EmpresaID: string;
    BB019_Filial: number;
    BB019_Codigo: number;
    BB019_Administradora: string;
    BB019_Taxa_de_Cobranca: number;
    BB019_VenctoPadrao: number;
    BB019_ContaID: string;
    BB019_UsaFatorAcresc: number;
    BB019_FinanProprio: number;
    BB019_TAC: number;
    BB019_Email: string;
    BB019_HomePage: string;
    BB019_TipoFinanc_ID: number;
    BB019_IsActive: boolean;
    BB019_DiaLimiteVenctoPadrao: number;
    BB019_CodigoCredenciadora: string;
    BB019_Logo_Adm: string;
    BB019_Filename: string;
}

export interface Csicp_bb019_Tipo {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
    tBand: string;
    CodgBandeira_Sitef: string;
    CodgAutorizadora: number;
}

export interface Csicp_bb012 {
    ID: string;
    BB012_Codigo: number;
    BB012_Nome_Cliente: string;
    BB012_Nome_Fantasia: string;
    BB012_Data_Aniversario: string;
    BB012_Data_Cadastro: string;
    BB012_Telefone: string;
    BB012_FaxCelular: string;
    BB012_Home_Page: string;
    BB012_Email: string;
    BB012_Data_Entrada_Sit: string;
    BB012_Data_Saida_Sit: string;
    BB012_Descricao: string;
    BB012_Is_Active: boolean;
    BB012_Tipo_Conta_ID: number;
    BB012_Grupoconta_ID: number;
    BB012_ClasseConta_ID: number;
    BB012_StatusConta_ID: number;
    BB012_Sit_Conta_ID: number;
    BB012_ModRelacao_ID: number;
    BB012_Sequence: number;
    bb012_dUltAlteracao: string;
    bb012_EstabCadID: string;
    bb012_KeyAcess: string;
    bb012_ID_Indicador: string;
    bb012_CountAppMCon: number;
    bb012_OriCadastroID: number;
}

export interface Csicp_statica_FinancProprio {
    Id: number;
    Label: string;
    TipoRegistro: number;
    Order: number;
}

export interface Csicp_statica_UsaFatorAcresc {
    Id: number;
    Label: string;
    TipoRegistro: number;
    Order: number;
}

export interface Code_Erro {
    Code_Erro: string;
    Mensagem: string;
}

export interface ApiResponse<T> {
    Lista_bb019_Completo: any;
    PageSize: any;
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
