//Interface de response da API List Zonas Completo
export interface Zona {
    PageSize: PageSize;
    csicp_bb010: Csicp_bb010[];
    Code_Erro: Code_Erro;
}

export interface PageSize {
    cs_list_total_itens: number;
    cs_itens_per_page: string;
    cs_number_of_pages: number;
}

export interface Csicp_bb010 {
    csicp_bb010: Csicp_bb0102;
}

export interface Csicp_bb0102 {
    csicp_bb010: Csicp_bb0102;
    csicp_aa028: Csicp_aa028;
    csicp_bb005: Csicp_bb005;
    csicp_bb006: Csicp_bb006;
    csicp_bb007: Csicp_bb007;
    csicp_bb01_Tp: Csicp_bb01_Tp;
}

export interface Csicp_bb0102 {
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

export interface Csicp_aa028 {
    Id: string;
    AA028_Cidade: string;
    AA028_PercICMSContrib: number;
    A028_PercICMSNContrib: number;
    A028_PercSubstTribut: number;
    A028_MascInsEstadual: string;
    A028_PercICMSEntrada: number;
    A028_MascIEImpressao: string;
    AA028_CodgIBGE: number;
    AA028_ZonaFranca: number;
    AA028_EstadoBrasil: number;
    UFId: string;
    AA028_Export_CidadeID: string;
    AA027_Export_UFID: string;
}

export interface Csicp_bb005 {
    ID: string;
    BB005_Filial: number;
    BB005_Codigo: number;
    BB005_NomeCCusto: string;
    BB005_ColunaImpressao: number;
    EmpresaId: string;
    BB005_IsActive: boolean;
}

export interface Csicp_bb006 {
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

export interface Csicp_bb007 {
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

export interface Csicp_bb01_Tp {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
    CS_Codg: number;
}

export interface Code_Erro {
    Code_Erro: string;
    Mensagem: string;
}
