import { URLBase } from '../../configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { ConvenioMasterCombo, ApiResponse } from '../../../types/crm/combos/combo_ConvenioMasterTypes';

function GetListConvenioMasterCombo(tenant: number | undefined): Promise<AxiosResponse<ApiResponse<ConvenioMasterCombo>>> {
    return axios.get<ApiResponse<ConvenioMasterCombo>>(`${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_Convenio/csicp_bb067_Get_List`, {
        headers: {
            tenant_id: tenant,
            In_IsActive: true,
            In_IsCount: false,
            in_search: '',
            in_currentPage: 1,
            in_pageSize: 999
        }
    });
}

export { GetListConvenioMasterCombo };
