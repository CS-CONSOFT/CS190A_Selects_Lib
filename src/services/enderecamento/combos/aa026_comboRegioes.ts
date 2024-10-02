import { URLBase } from '@/services/configuracoes_axios';
import axios, { AxiosResponse } from 'axios';
import type { ComboRegioes } from '@/types/enderecamento/combos/Combo_RegioesType';

function getListaRegioesCombo(tenant: number | undefined): Promise<AxiosResponse<ComboRegioes>> {
    return axios.get<ComboRegioes>(`${URLBase}/CSR_BB100_ClienteFor_IS/rest/CS_Enderecamento/csicp_aa026_Get_Combo_Regioes`, {
        headers: {
            tenant_id: tenant,
            In_IsActive: true,
            in_search: ''
        }
    });
}

export { getListaRegioesCombo };
