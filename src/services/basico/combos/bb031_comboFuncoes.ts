import { URLBase } from '../../../services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { FuncoesCompleto, ApiResponse } from '../../../types/basico/funcoes/bb031_funcoes';

function GetListFuncoesCombo(tenant: number | undefined): Promise<AxiosResponse<ApiResponse<FuncoesCompleto>>> {
    return axios.get<ApiResponse<FuncoesCompleto>>(
        `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb031_Get_List_Funcao`,
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

export { GetListFuncoesCombo };
