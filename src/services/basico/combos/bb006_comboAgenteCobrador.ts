import { URLBase } from '../../configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { AgenteCobradorCombo, ApiResponse } from '../../../types/basico/agente_cobrador/combo/bb006_comboAgenteCobrador';

function GetListAgenteCobradorCombo(tenant: number | undefined): Promise<AxiosResponse<ApiResponse<AgenteCobradorCombo>>> {
    return axios.get<ApiResponse<AgenteCobradorCombo>>(
        `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb006_Get_List_AgCobrador`,
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

export { GetListAgenteCobradorCombo };
