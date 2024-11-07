import { URLBase } from '../../../services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { AtividadeSimples, ApiResponse } from '../../../types/basico/atividade/bb011_atividade';

function getListAtividade(tenant_id: number | undefined): Promise<AxiosResponse<ApiResponse<AtividadeSimples>>> {
    return axios.get<ApiResponse<AtividadeSimples>>(
        `${URLBase}CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb011_Get_List_Atividade`,
        {
            headers: {
                tenant_id: tenant_id,
                In_IsActive: true,
                In_IsCount: false,
                in_search: '',
                in_currentPage: 1,
                in_pageSize: 999
            }
        }
    );
}

export { getListAtividade };
