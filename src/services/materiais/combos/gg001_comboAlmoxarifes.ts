import { URLBase } from '@/services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { ComboAlmoxarife, ApiResponseGG001Combo } from '@/types/materiais/combos/Combo_AlmoxarifeTypes';

function getListAlmoxarifesCombo(tenant: number | undefined): Promise<AxiosResponse<ApiResponseGG001Combo<ComboAlmoxarife>>> {
    return axios.get<ApiResponseGG001Combo<ComboAlmoxarife>>(
        `${URLBase}/CSR_GG100_Materiais_API_IS/rest/CS_Materiais/csicp_gg001_Get_List_Almox`,
        {
            headers: {
                tenant_id: tenant,
                In_IsActive: true,
                in_search: '',
                in_currentPage: 1,
                in_pageSize: 999
            }
        }
    );
}

export { getListAlmoxarifesCombo };
