import { URLBase } from '@/services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { ComboUF, ApiResponseAA027Combo } from '@/types/enderecamento/combos/Combo_UnFederativaTypes';

function getListaUFCombo(tenant: number | undefined, pais: string | undefined): Promise<AxiosResponse<ApiResponseAA027Combo<ComboUF>>> {
    return axios.get<ApiResponseAA027Combo<ComboUF>>(`${URLBase}/CSR_BB100_ClienteFor_IS/rest/CS_Enderecamento/csicp_aa027_Get_Combo_UFs`, {
        headers: {
            tenant_id: tenant,
            In_IsActive: true,
            in_search: '',
            In_PaisID: pais || ''
        }
    });
}

export default getListaUFCombo;
