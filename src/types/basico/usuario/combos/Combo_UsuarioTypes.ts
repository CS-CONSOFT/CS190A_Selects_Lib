export interface ComboUsuarios {
    Usuarios_List: Usuarios_List[];
    Code_Erro: Code_Erro;
}

export interface Usuarios_List {
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

export interface Code_Erro {
    Code_Erro: string;
    Mensagem: string;
}

export interface ApiResponseSY001Combo<T> {
    Usuarios_List: {
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
    }[];
    PageSize: any;
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}
