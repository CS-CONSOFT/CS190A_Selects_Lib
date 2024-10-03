export interface User {
    TenantId: number;
    UsuarioId: string;
    NomeUsuario: string;
    EstabelecimentoId: string;
    NomeEstabelecimento: string;
    UserID: number;
    Estab_Img: string;
}

export interface IListaEstabelecimentos {
    Lista_Estabs_Usuario: IEstabelecimentoListItem[];
}

export interface IEstabelecimentoListItem {
    EstabelecimentoId: string;
    CodigoEstab: string;
    NomeEstabelecimento: string;
    NomeFantasia: string;
}

export interface Registro {
    Dominio: string;
    Usuario: string;
    Senha: string;
}
