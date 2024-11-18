import { URLBase } from '../../../services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { ComboConvenio, ApiResponse } from '../../../types/crm/combos/combo_ConvenioTypes';

function getListConvenioCombo(tenant: number | undefined): Promise<AxiosResponse<ApiResponse<ComboConvenio>>> {
    return axios.get<ApiResponse<ComboConvenio>>(
        `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_Convenio/csicp_bb060_Get_Lista_Convenio_Simples`,
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

export { getListConvenioCombo };
