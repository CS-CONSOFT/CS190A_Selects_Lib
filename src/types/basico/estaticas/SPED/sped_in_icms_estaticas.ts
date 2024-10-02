export interface EstaticasSpedIcms {
    sped_in_doc_ICMS: SpedInICMS[];
}

export interface SpedInICMS {
    Id: number;
    Label: string;
    Codigo: string;
    Order: number;
    Is_Active: boolean;
    Cupom: boolean;
    DocFiscal: boolean;
}
