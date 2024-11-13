import { URLBase } from '../../configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { TpCobranca, ApiResponse } from '../../../types/basico/tipo_de_cobranca/bb009_TpCobranca';

function GetListTpCobrancaCombo(tenant: number | undefined): Promise<AxiosResponse<ApiResponse<TpCobranca>>> {
    return axios.get<ApiResponse<TpCobranca>>(
        `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb009_Get_List_TipoCobranca`,
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

export { GetListTpCobrancaCombo };
