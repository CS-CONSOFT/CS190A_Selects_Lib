import { URLBase } from '@/services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { ComboPaises, ApiResponseAA025Combo } from '@/types/enderecamento/combos/Combo_PaisesTypes';

function getListaPaisesCombo(tenant: number | undefined): Promise<AxiosResponse<ApiResponseAA025Combo<ComboPaises>>> {
    return axios.get<ApiResponseAA025Combo<ComboPaises>>(
        `${URLBase}/CSR_BB100_ClienteFor_IS/rest/CS_Enderecamento/csicp_aa025_Get_Combo_Paises`,
        {
            headers: {
                tenant_id: tenant,
                In_IsActive: true,
                in_search: ''
            }
        }
    );
}

export { getListaPaisesCombo };
