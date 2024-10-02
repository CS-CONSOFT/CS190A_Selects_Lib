export interface ResponsavelCompleto {
    PageSize: PageSize;
    Lista_bb007_Completo: Lista_bb007_Completo[];
    Code_Erro: Code_Erro;
}

export interface PageSize {
    cs_list_total_itens: number;
    cs_itens_per_page: string;
    cs_number_of_pages: number;
}

export interface Lista_bb007_Completo {
    bb007: Bb007;
    ContasClientes: ContasClientes[];
    ResponsavelAlmoxarife: ResponsavelAlmoxarife[];
}

export interface Bb007 {
    csicp_bb007: Csicp_bb007;
    csicp_sy001: Csicp_sy001;
    csicp_bb001: Csicp_bb001;
    csicp_bb005: Csicp_bb005;
    csicp_bb012: Csicp_bb012;
    csicp_bb031: Csicp_bb031;
    csicp_bb032: Csicp_bb032;
    csicp_gg001: Csicp_gg001;
    csicp_statica_BB007_BaseComAcrFinan: Csicp_statica_BB007_BaseComAcrFinan;
    csicp_statica_BB007_BaseComDespesas: Csicp_statica_BB007_BaseComDespesas;
    csicp_statica_BB007_BaseComFrete: Csicp_statica_BB007_BaseComFrete;
    csicp_statica_BB007_BaseComICMS: Csicp_statica_BB007_BaseComICMS;
    csicp_statica_BB007_BaseComICMSRet: Csicp_statica_BB007_BaseComICMSRet;
    csicp_statica_BB007_BaseComIPI: Csicp_statica_BB007_BaseComIPI;
    csicp_statica_BB007_BaseComSeguro: Csicp_statica_BB007_BaseComSeguro;
    csicp_statica_BB007_GeraCPagar: Csicp_statica_BB007_GeraCPagar;
    csicp_statica_BB007_VinculoCliente: Csicp_statica_BB007_VinculoCliente;
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

export interface Csicp_sy001 {
    Id: string;
    SY001_Usuario: string;
    SY001_Nome: string;
    SY001_Senha: string;
    SY001_Bloqueado: boolean;
    SY001_Data_Validade: string;
    SY001_AutAlterarSenha: number;
    SY001_AltSenhaPxLogin: number;
    SY001_Expira_Senha: number;
    SY001_SenhExpAposNDias: number;
    SY001_DtExpiracaoLogin: string;
    SY001_DeptoLotado: string;
    SY001_Cargo: string;
    SY001_Email: string;
    SY001_Imagem: string;
    SY001_DataUltimoAcesso: string;
    UserID: number;
    SY001_Idioma_ID: number;
    SY001_SenhaCS: string;
    SY001_Celular: string;
}

export interface Csicp_bb001 {
    ID: string;
    BB001_CodigoEmpresa: number;
    BB001_RazaoSocial: string;
    BB001_Endereco: string;
    BB001_Complemento: string;
    BB001_NumResidencial: string;
    BB001_Bairro: string;
    BB001_CEP: number;
    BB001_CNPJ: number;
    BB001_InscEstadual: string;
    BB001_InscJunta: number;
    BB001_DataInscricao: string;
    BB001_NomeFantasia: string;
    BB001_Telefone: string;
    BB001_Fax: string;
    BB001_SlogamEmpresa1: string;
    BB001_SlogamEmpresa2: string;
    BB001_Email: string;
    BB001_HomePage: string;
    BB001_RamoEmpresa: number;
    BB002_GrupoEmpresa: string;
    BB001_CodgClienteAux: number;
    BB001_AlmoxPadrao: number;
    BB001_AlmoxTransfer: number;
    BB001_BDDistribuida: number;
    BB001_CNAEFiscal: number;
    BB001_SUFRAMAEmp: string;
    BB001_InscMunicipal: string;
    BB001_PaisID: string;
    CidadeId: string;
    BB001_UFID: string;
    BB001_NomeOficial: string;
    BB001_CPF_Oficial: number;
    BB001_CodgCartorio: number;
    BB001_NomeSubstituto: string;
    BB001_DescricaoOficial: string;
    BB001_CapitalMunicipio: number;
    bb001_Cor1_Hexa: string;
    bb001_Cor2_Hexa: string;
    BB001_Idioma_ID: number;
    BB001_IsActive: boolean;
    BB001_Token: string;
    BB001_UsuarioSIRC: string;
    BB001_SenhaSIRC: string;
    BB001_TenantFiscal: number;
    bb001_Token_eSitef: string;
    bb001_URL_GooglePlay: string;
    bb001_URL_AppStore: string;
    bb001_CIX: string;
    BB001_Chave_APL: string;
    BB001_Aut_Token: string;
    BB001_Token_CSPIX: string;
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

export interface Csicp_bb031 {
    ID: string;
    BB031_CodgFuncaoID: number;
    BB031_Descricao: string;
    BB031_CBO: string;
    BB031_IsActive: boolean;
}

export interface Csicp_bb032 {
    ID: string;
    BB032_CodgCargoID: number;
    BB032_Cargo: string;
    BB032_IsActive: boolean;
}

export interface Csicp_gg001 {
    Id: string;
    GG001_Filial: number;
    GG001_FilialID: string;
    GG001_CodigoAlmox: number;
    GG001_DescAlmox: string;
    GG001_IsActive: boolean;
    GG001_TipoAlmoxarifado: number;
    GG001_RI_ControleQualidade: boolean;
    GG001_CapArmaz: number;
    GG001_DescNSPadrao: string;
}

export interface Csicp_statica_BB007_BaseComAcrFinan {
    Id: number;
    Label: string;
    TipoRegistro: number;
    Order: number;
}

export interface Csicp_statica_BB007_BaseComDespesas {
    Id: number;
    Label: string;
    TipoRegistro: number;
    Order: number;
}

export interface Csicp_statica_BB007_BaseComFrete {
    Id: number;
    Label: string;
    TipoRegistro: number;
    Order: number;
}

export interface Csicp_statica_BB007_BaseComICMS {
    Id: number;
    Label: string;
    TipoRegistro: number;
    Order: number;
}

export interface Csicp_statica_BB007_BaseComICMSRet {
    Id: number;
    Label: string;
    TipoRegistro: number;
    Order: number;
}

export interface Csicp_statica_BB007_BaseComIPI {
    Id: number;
    Label: string;
    TipoRegistro: number;
    Order: number;
}

export interface Csicp_statica_BB007_BaseComSeguro {
    Id: number;
    Label: string;
    TipoRegistro: number;
    Order: number;
}

export interface Csicp_statica_BB007_GeraCPagar {
    Id: number;
    Label: string;
    TipoRegistro: number;
    Order: number;
}

export interface Csicp_statica_BB007_VinculoCliente {
    Id: number;
    Label: string;
    TipoRegistro: number;
    Order: number;
}

export interface ContasClientes {
    csicp_bb007c: Csicp_bb007c;
    csicp_bb012: Csicp_bb012;
}

export interface Csicp_bb007c {
    bb007c_Id: number;
    bb007_ResponID: string;
    bb012_ContaID: string;
    BB007c_pComissao: number;
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

export interface ResponsavelAlmoxarife {
    csicp_bb007d: Csicp_bb007d;
    csicp_bb001: Csicp_bb0012;
    csicp_gg001: Csicp_gg0012;
    csicp_gg001_TALmox: Csicp_gg001_TALmox;
}

export interface Csicp_bb007d {
    bb007d_Id: number;
    bb007_ResponID: string;
    gg001_AlmoxID: string;
}

export interface Csicp_bb0012 {
    ID: string;
    BB001_CodigoEmpresa: number;
    BB001_RazaoSocial: string;
    BB001_Endereco: string;
    BB001_Complemento: string;
    BB001_NumResidencial: string;
    BB001_Bairro: string;
    BB001_CEP: number;
    BB001_CNPJ: number;
    BB001_InscEstadual: string;
    BB001_InscJunta: number;
    BB001_DataInscricao: string;
    BB001_NomeFantasia: string;
    BB001_Telefone: string;
    BB001_Fax: string;
    BB001_SlogamEmpresa1: string;
    BB001_SlogamEmpresa2: string;
    BB001_Email: string;
    BB001_HomePage: string;
    BB001_RamoEmpresa: number;
    BB002_GrupoEmpresa: string;
    BB001_CodgClienteAux: number;
    BB001_AlmoxPadrao: number;
    BB001_AlmoxTransfer: number;
    BB001_BDDistribuida: number;
    BB001_CNAEFiscal: number;
    BB001_SUFRAMAEmp: string;
    BB001_InscMunicipal: string;
    BB001_PaisID: string;
    CidadeId: string;
    BB001_UFID: string;
    BB001_NomeOficial: string;
    BB001_CPF_Oficial: number;
    BB001_CodgCartorio: number;
    BB001_NomeSubstituto: string;
    BB001_DescricaoOficial: string;
    BB001_CapitalMunicipio: number;
    bb001_Cor1_Hexa: string;
    bb001_Cor2_Hexa: string;
    BB001_Idioma_ID: number;
    BB001_IsActive: boolean;
    BB001_Token: string;
    BB001_UsuarioSIRC: string;
    BB001_SenhaSIRC: string;
    BB001_TenantFiscal: number;
    bb001_Token_eSitef: string;
    bb001_URL_GooglePlay: string;
    bb001_URL_AppStore: string;
    bb001_CIX: string;
    BB001_Chave_APL: string;
    BB001_Aut_Token: string;
    BB001_Token_CSPIX: string;
}

export interface Csicp_gg0012 {
    Id: string;
    GG001_Filial: number;
    GG001_FilialID: string;
    GG001_CodigoAlmox: number;
    GG001_DescAlmox: string;
    GG001_IsActive: boolean;
    GG001_TipoAlmoxarifado: number;
    GG001_RI_ControleQualidade: boolean;
    GG001_CapArmaz: number;
    GG001_DescNSPadrao: string;
}

export interface Csicp_gg001_TALmox {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Code_Erro {
    Code_Erro: string;
    Mensagem: string;
}

export interface ApiResponseResponsavel<T> {
    Lista_bb007_Completo: any;
    PageSize: any;
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
