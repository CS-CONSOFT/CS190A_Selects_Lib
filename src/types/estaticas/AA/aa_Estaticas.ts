export interface EstaticasAA {
    csicp_aa030_Regime: Csicp_aa030_Regime[];
    csicp_aa030_TpToken: Csicp_aa030_TpToken[];
    csicp_aa031_cstori: Csicp_aa031_cstori[];
    csicp_aa032_csticm: Csicp_aa032_csticm[];
    csicp_aa033_cstipi: Csicp_aa033_cstipi[];
    csicp_aa034_cstpis: Csicp_aa034_cstpis[];
    csicp_aa035_cstcof: Csicp_aa035_cstcof[];
    csicp_aa036_ipiaju: Csicp_aa036_ipiaju[];
    csicp_aa037_Imp: Csicp_aa037_Imp[];
    csicp_aa038_modst: Csicp_aa038_modst[];
    csicp_aa039_mp255: Csicp_aa039_mp255[];
}

export interface Csicp_aa030_Regime {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
    CRT_Digito: string;
}

export interface Csicp_aa030_TpToken {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_aa031_cstori {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
    CST_Digito: string;
}

export interface Csicp_aa032_csticm {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
    CST_Digito: string;
    Regime_ID: number;
    Regime: string;
    Informativo: string;
}

export interface Csicp_aa033_cstipi {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
    CST_Digito: string;
}

export interface Csicp_aa034_cstpis {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
    CST_Digito: string;
}

export interface Csicp_aa035_cstcof {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
    CST_Digito: string;
}

export interface Csicp_aa036_ipiaju {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
    DebCre: string;
    Descricao: string;
}

export interface Csicp_aa037_Imp {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_aa038_modst {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
    digito: string;
}

export interface Csicp_aa039_mp255 {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}
