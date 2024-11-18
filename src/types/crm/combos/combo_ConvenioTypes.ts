export interface ComboConvenio {
    PageSize: PageSize;
    Convenio_List: Convenio_List[];
    Code_Erro: Code_Erro;
}

export interface PageSize {
    cs_list_total_itens: number;
    cs_itens_per_page: string;
    cs_number_of_pages: number;
}

export interface Convenio_List {
    bb060_ConvenioId: number;
    bb060_Codigo: string;
    bb060_Descricao: string;
    bb060_vBase: number;
    bb060_CCustoID: string;
    bb060_UsuarioProprieID: string;
    bb060_AgCobradorID: string;
    bb060_ResponsavelID: string;
    bb060_CondicaoID: string;
    bb060_TipoCobrancaID: string;
    bb060_UsuarioInc: string;
    bb060_UsuarioAlt: string;
    bb060_dthrInc: string;
    bb060_dthrAlt: string;
    bb060_EspecieID: string;
    bb060_FPagto_ID: string;
    bb060_IsActive: boolean;
    bb060_ConvMasterID: number;
}

export interface Code_Erro {
    Code_Erro: string;
    Mensagem: string;
}

export interface ApiResponse<T> {
    Convenio_List: {
        bb060_ConvenioId: number;
        bb060_Codigo: string;
        bb060_Descricao: string;
        bb060_vBase: number;
        bb060_CCustoID: string;
        bb060_UsuarioProprieID: string;
        bb060_AgCobradorID: string;
        bb060_ResponsavelID: string;
        bb060_CondicaoID: string;
        bb060_TipoCobrancaID: string;
        bb060_UsuarioInc: string;
        bb060_UsuarioAlt: string;
        bb060_dthrInc: string;
        bb060_dthrAlt: string;
        bb060_EspecieID: string;
        bb060_FPagto_ID: string;
        bb060_IsActive: boolean;
        bb060_ConvMasterID: number;
    }[];
    PageSize: any;
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
