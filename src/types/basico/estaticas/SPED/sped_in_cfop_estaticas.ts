export interface EstaticasSpedCFOP {
    sped_in_CFOP: SpedInCFOP[];
}

export interface SpedInCFOP {
    Id: number;
    Codigo: string;
    Descricao: string;
    Is_Active: boolean;
    Order: number;
}
