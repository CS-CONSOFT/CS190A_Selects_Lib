export interface ComboResponsaveis {
    PageSize: PageSize;
    Lista_bb007: Lista_bb007[];
    Code_Erro: Code_Erro;
}

export interface PageSize {
    cs_list_total_itens: number;
    cs_itens_per_page: string;
    cs_number_of_pages: number;
}

export interface Lista_bb007 {
    ID: string;
    BB007_Filial: number;
    BB007_Codigo: number;
    BB007_Responsavel: string;
    BB007_NomeReduzido: string;
    BB007_Classificacao: number;
    BB007_Usuario_ID: string;
    BB007_CodgSupervisor: string;
    BB007_CodgGerente: string;
    BB007_GeraCPagar: number;
    BB007_Coms1: number;
    BB007_Coms2: number;
    BB007_Coms3: number;
    BB007_Coms4: number;
    BB007_Coms5: number;
    BB007_BaseComICMS: number;
    BB007_BaseComICMSRet: number;
    BB007_BaseComIPI: number;
    BB007_BaseComFrete: number;
    BB007_BaseComAcrFinan: number;
    BB007_BaseComDespesas: number;
    BB007_BaseComSeguro: number;
    BB007_MaxDescVenda: number;
    BB007_CodgCCusto: number;
    BB007_CodgAlmox: number;
    BB007_CodgAtividade: number;
    BB007_Senha: string;
    BB007_NomeBanco: string;
    BB007_Agencia: string;
    BB007_Conta: string;
    BB007_CORERegistro: string;
    BB007_VinculoCliente: number;
    BB007_Observacao: string;
    BB007_NroHandHeld: number;
    BB007_UserHandHeld: string;
    BB007_SenhaHandHeld: string;
    BB007_HandHeldSuperv: number;
    BB007_ImpHandHeld: string;
    BB007_NomeUsuario: string;
    BB031_FuncaoID: string;
    BB032_CargoID: string;
    BB007_DtAdmissao: string;
    BB007_DtDemissao: string;
    BB007_CodgRegiao: string;
    BB007_FaixaAutorizacao: string;
    BB007_CCustoID: string;
    BB007_AlmoxID: string;
    EmpresaID: string;
    BB007_IsActive: boolean;
    bb007_ContaFornID: string;
}

export interface Code_Erro {
    Code_Erro: string;
    Mensagem: string;
}

export interface ApiResponseBB007Combo<T> {
    Lista_bb007: {
        ID: string;
        BB007_Filial: number;
        BB007_Codigo: number;
        BB007_Responsavel: string;
        BB007_NomeReduzido: string;
        BB007_Classificacao: number;
        BB007_Usuario_ID: string;
        BB007_CodgSupervisor: string;
        BB007_CodgGerente: string;
        BB007_GeraCPagar: number;
        BB007_Coms1: number;
        BB007_Coms2: number;
        BB007_Coms3: number;
        BB007_Coms4: number;
        BB007_Coms5: number;
        BB007_BaseComICMS: number;
        BB007_BaseComICMSRet: number;
        BB007_BaseComIPI: number;
        BB007_BaseComFrete: number;
        BB007_BaseComAcrFinan: number;
        BB007_BaseComDespesas: number;
        BB007_BaseComSeguro: number;
        BB007_MaxDescVenda: number;
        BB007_CodgCCusto: number;
        BB007_CodgAlmox: number;
        BB007_CodgAtividade: number;
        BB007_Senha: string;
        BB007_NomeBanco: string;
        BB007_Agencia: string;
        BB007_Conta: string;
        BB007_CORERegistro: string;
        BB007_VinculoCliente: number;
        BB007_Observacao: string;
        BB007_NroHandHeld: number;
        BB007_UserHandHeld: string;
        BB007_SenhaHandHeld: string;
        BB007_HandHeldSuperv: number;
        BB007_ImpHandHeld: string;
        BB007_NomeUsuario: string;
        BB031_FuncaoID: string;
        BB032_CargoID: string;
        BB007_DtAdmissao: string;
        BB007_DtDemissao: string;
        BB007_CodgRegiao: string;
        BB007_FaixaAutorizacao: string;
        BB007_CCustoID: string;
        BB007_AlmoxID: string;
        EmpresaID: string;
        BB007_IsActive: boolean;
        bb007_ContaFornID: string;
    }[];
    PageSize: any;
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
