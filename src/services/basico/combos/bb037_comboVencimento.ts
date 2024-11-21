import { URLBase } from '../../../services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { VencimentoCompleto, ApiResponse } from '../../../types/basico/vencimento/bb037_vencimento';

function GetListVencimentoCombo(tenant: number | undefined): Promise<AxiosResponse<ApiResponse<VencimentoCompleto>>> {
    return axios.get<ApiResponse<VencimentoCompleto>>(
        `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb037_Get_List_Vencimento`,
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

export { GetListVencimentoCombo };
