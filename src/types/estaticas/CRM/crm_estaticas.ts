export interface EstaticasCRM {
    csicp_bb012_ClaCta: Csicp_bb012_ClaCta[];
    csicp_bb012_GruCta: Csicp_bb012_GruCta[];
    csicp_bb012j_TpEnd: Csicp_bb012j_TpEnd[];
    csicp_bb012_mcred: Csicp_bb012_mcred[];
    csicp_bb012mdc: Csicp_bb012mdc[];
    csicp_bb012_MRel: Csicp_bb012_MRel[];
    csicp_bb012_SitCta: Csicp_bb012_SitCta[];
    csicp_bb012_StaCta: Csicp_bb012_StaCta[];
    csicp_bb012_TpCta: Csicp_bb012_TpCta[];
    csicp_bb035_gpa: Csicp_bb035_gpa[];
    csicp_bb035_Origem: Csicp_bb035_Origem[];
    csicp_bb036_Sit: Csicp_bb036_Sit[];
    csicp_bb035_Trat: Csicp_bb035_Trat[];
    csicp_bb040_cont: Csicp_bb040_cont[];
    csicp_bb040_ctaCas: Csicp_bb040_ctaCas[];
    csicp_bb040_Fin: Csicp_bb040_Fin[];
    csicp_bb040_Pri: Csicp_bb040_Pri[];
    csicp_bb040_sit: Csicp_bb040_sit[];
    csicp_bb041_Caso: Csicp_bb041_Caso[];
    csicp_bb041_Origem: Csicp_bb041_Origem[];
    csicp_bb041_Sit: Csicp_bb041_Sit[];
    csicp_bb041_Tipo: Csicp_bb041_Tipo[];
    csicp_bb042_est: Csicp_bb042_est[];
    csicp_bb043_sit: Csicp_bb043_sit[];
    csicp_bb043_TpCam: Csicp_bb043_TpCam[];
    csicp_bb046_lj2: Csicp_bb046_lj2[];
    csicp_bb061_tp: Csicp_bb061_tp[];
    csicp_bb062_sta: Csicp_bb062_sta[];
    csicp_bb01201_con: Csicp_bb01201_con[];
    csicp_bb01201_jur: Csicp_bb01201_jur[];
    csicp_bb01201_TGer: Csicp_bb01201_TGer[];
    csicp_bb01202_Dom: Csicp_bb01202_Dom[];
    csicp_bb01202_ECiv: Csicp_bb01202_ECiv[];
    csicp_bb01202_Ins: Csicp_bb01202_Ins[];
    csicp_bb01202_Ocu: Csicp_bb01202_Ocu[];
    csicp_bb01202_Res: Csicp_bb01202_Res[];
    csicp_bb01202_Sex: Csicp_bb01202_Sex[];
    csicp_bb01202_Esc: Csicp_bb01202_Esc[];
}

export interface Csicp_bb012_ClaCta {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb012_GruCta {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
    UsoCS: string;
}

export interface Csicp_bb012j_TpEnd {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb012_mcred {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb012mdc {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb012_MRel {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb012_SitCta {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
    CodgCS: number;
}

export interface Csicp_bb012_StaCta {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb012_TpCta {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb035_gpa {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb035_Origem {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb036_Sit {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb035_Trat {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb040_cont {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb040_ctaCas {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb040_Fin {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb040_Pri {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb040_sit {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb041_Caso {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb041_Origem {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb041_Sit {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb041_Tipo {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb042_est {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb043_sit {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb043_TpCam {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb046_lj2 {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
    Codg_CS: string;
}

export interface Csicp_bb061_tp {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb062_sta {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb01201_con {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb01201_jur {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
    CodgCS: number;
}

export interface Csicp_bb01201_TGer {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb01202_Dom {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb01202_ECiv {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb01202_Ins {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb01202_Ocu {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb01202_Res {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb01202_Sex {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}

export interface Csicp_bb01202_Esc {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
    LabelMeuCrediario: string;
}
