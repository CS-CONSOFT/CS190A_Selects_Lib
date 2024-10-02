export interface EstaticasFF {
    csicp_ff003_TpEsp_List: Csicp_ff003_TpEsp_List[];
    csicp_ff102_API_Banco_List: Csicp_ff102_API_Banco_List[];
}

export interface Csicp_ff003_TpEsp_List {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
    ID_PDV: number;
}

export interface Csicp_ff102_API_Banco_List {
    Id: number;
    Label: string;
    Order: number;
    Is_Active: boolean;
}
