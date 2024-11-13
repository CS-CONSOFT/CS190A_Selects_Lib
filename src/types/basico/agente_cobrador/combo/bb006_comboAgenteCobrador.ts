export interface AgenteCobradorCombo {
    PageSize: PageSize;
    Lista_bb006: Lista_bb006[];
    Code_Erro: Code_Erro;
}

export interface PageSize {
    cs_list_total_itens: number;
    cs_itens_per_page: string;
    cs_number_of_pages: number;
}

export interface Lista_bb006 {
    ID: string;
    BB006_Filial: number;
    BB006_CodgBanco: number;
    BB006_Banco: string;
    BB006_NomeReduzido: string;
    BB006_NoBanco: number;
    BB006_Agencia: number;
    BB006_Agencia_DV: string;
    BB006_NoConta: number;
    BB006_ContaDV: string;
    BB006_DVAgenciaCC: string;
    BB006_Endereco: string;
    BairroId: string;
    CidadeId: string;
    BB006_Telefone: string;
    BB006_Fax: string;
    BB006_Email: string;
    BB006_HomePage: string;
    BB006_Contato: string;
    BB006_DiasRetencao: number;
    BB006_DiasRetencaoDesc: number;
    BB006_SaldoAtual: number;
    BB006_TxCobSimples: number;
    BB006_TxDesconto: number;
    BB006_ContaContabil: string;
    BB006_CodgHistorico: number;
    BB006_LimiteCredito: number;
    BB006_MsgBoleto: string;
    BB006_CodEmpresaBanco: string;
    BB006_NroSeqRemessa: number;
    BB006_PercComissao: number;
    BB006_MovtaTesouraria: number;
    BB006_NomeAgencia: string;
    BB006_Classificacao: number;
    BB006_CodGeracaoCRec: number;
    EmpresaId: string;
    BB006_TipoCobrancaID: string;
    UFId: string;
    BB006_IsActive: boolean;
    BB006_Banco_ID: number;
    BB006_CodCobrador_ID: string;
    BB006_API_ID: number;
}

export interface Code_Erro {
    Code_Erro: string;
    Mensagem: string;
}

export interface ApiResponse<T> {
    Lista_bb006: {
        ID: string;
        BB006_Filial: number;
        BB006_CodgBanco: number;
        BB006_Banco: string;
        BB006_NomeReduzido: string;
        BB006_NoBanco: number;
        BB006_Agencia: number;
        BB006_Agencia_DV: string;
        BB006_NoConta: number;
        BB006_ContaDV: string;
        BB006_DVAgenciaCC: string;
        BB006_Endereco: string;
        BairroId: string;
        CidadeId: string;
        BB006_Telefone: string;
        BB006_Fax: string;
        BB006_Email: string;
        BB006_HomePage: string;
        BB006_Contato: string;
        BB006_DiasRetencao: number;
        BB006_DiasRetencaoDesc: number;
        BB006_SaldoAtual: number;
        BB006_TxCobSimples: number;
        BB006_TxDesconto: number;
        BB006_ContaContabil: string;
        BB006_CodgHistorico: number;
        BB006_LimiteCredito: number;
        BB006_MsgBoleto: string;
        BB006_CodEmpresaBanco: string;
        BB006_NroSeqRemessa: number;
        BB006_PercComissao: number;
        BB006_MovtaTesouraria: number;
        BB006_NomeAgencia: string;
        BB006_Classificacao: number;
        BB006_CodGeracaoCRec: number;
        EmpresaId: string;
        BB006_TipoCobrancaID: string;
        UFId: string;
        BB006_IsActive: boolean;
        BB006_Banco_ID: number;
        BB006_CodCobrador_ID: string;
        BB006_API_ID: number;
    }[];
    PageSize: any;
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
export interface AgenteCobradorCombo {
    PageSize: PageSize;
    Lista_bb006: Lista_bb006[];
    Code_Erro: Code_Erro;
}

export interface PageSize {
    cs_list_total_itens: number;
    cs_itens_per_page: string;
    cs_number_of_pages: number;
}

export interface Lista_bb006 {
    ID: string;
    BB006_Filial: number;
    BB006_CodgBanco: number;
    BB006_Banco: string;
    BB006_NomeReduzido: string;
    BB006_NoBanco: number;
    BB006_Agencia: number;
    BB006_Agencia_DV: string;
    BB006_NoConta: number;
    BB006_ContaDV: string;
    BB006_DVAgenciaCC: string;
    BB006_Endereco: string;
    BairroId: string;
    CidadeId: string;
    BB006_Telefone: string;
    BB006_Fax: string;
    BB006_Email: string;
    BB006_HomePage: string;
    BB006_Contato: string;
    BB006_DiasRetencao: number;
    BB006_DiasRetencaoDesc: number;
    BB006_SaldoAtual: number;
    BB006_TxCobSimples: number;
    BB006_TxDesconto: number;
    BB006_ContaContabil: string;
    BB006_CodgHistorico: number;
    BB006_LimiteCredito: number;
    BB006_MsgBoleto: string;
    BB006_CodEmpresaBanco: string;
    BB006_NroSeqRemessa: number;
    BB006_PercComissao: number;
    BB006_MovtaTesouraria: number;
    BB006_NomeAgencia: string;
    BB006_Classificacao: number;
    BB006_CodGeracaoCRec: number;
    EmpresaId: string;
    BB006_TipoCobrancaID: string;
    UFId: string;
    BB006_IsActive: boolean;
    BB006_Banco_ID: number;
    BB006_CodCobrador_ID: string;
    BB006_API_ID: number;
}

export interface Code_Erro {
    Code_Erro: string;
    Mensagem: string;
}

export interface ApiResponse<T> {
    Lista_bb006: {
        ID: string;
        BB006_Filial: number;
        BB006_CodgBanco: number;
        BB006_Banco: string;
        BB006_NomeReduzido: string;
        BB006_NoBanco: number;
        BB006_Agencia: number;
        BB006_Agencia_DV: string;
        BB006_NoConta: number;
        BB006_ContaDV: string;
        BB006_DVAgenciaCC: string;
        BB006_Endereco: string;
        BairroId: string;
        CidadeId: string;
        BB006_Telefone: string;
        BB006_Fax: string;
        BB006_Email: string;
        BB006_HomePage: string;
        BB006_Contato: string;
        BB006_DiasRetencao: number;
        BB006_DiasRetencaoDesc: number;
        BB006_SaldoAtual: number;
        BB006_TxCobSimples: number;
        BB006_TxDesconto: number;
        BB006_ContaContabil: string;
        BB006_CodgHistorico: number;
        BB006_LimiteCredito: number;
        BB006_MsgBoleto: string;
        BB006_CodEmpresaBanco: string;
        BB006_NroSeqRemessa: number;
        BB006_PercComissao: number;
        BB006_MovtaTesouraria: number;
        BB006_NomeAgencia: string;
        BB006_Classificacao: number;
        BB006_CodGeracaoCRec: number;
        EmpresaId: string;
        BB006_TipoCobrancaID: string;
        UFId: string;
        BB006_IsActive: boolean;
        BB006_Banco_ID: number;
        BB006_CodCobrador_ID: string;
        BB006_API_ID: number;
    }[];
    PageSize: any;
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
