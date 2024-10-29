import { URLBase } from '../../configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { ComboContatos, ApiResponseCombo } from '../../../types/crm/combos/combo_ContatosTypes';

function getListContatosCombo(tenant: number | undefined): Promise<AxiosResponse<ApiResponseCombo<ComboContatos>>> {
    return axios.get<ApiResponseCombo<ComboContatos>>(
        `${URLBase}/CSR_BB100_ClienteFor_IS/rest/CS_CRM_OutrasFontes/csicp_bb035_Get_List_Contatos`,
        {
            headers: {
                tenant_id: tenant,
                In_IsActive: true,
                In_IsCount: false,
                in_search: '',
                in_currentPage: 1,
                in_pageSize: 999
            }
        }
    );
}

export { getListContatosCombo };
