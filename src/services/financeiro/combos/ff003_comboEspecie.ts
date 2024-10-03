import { URLBase } from '@/services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { EspecieCompleto, ApiResponse } from '@/types/financeiro/especie/ff003_especie';

function GetListEspecieCombo(tenant: number | undefined): Promise<AxiosResponse<ApiResponse<EspecieCompleto>>> {
    return axios.get<ApiResponse<EspecieCompleto>>(
        `${URLBase}/CSR_FF100_Financeiro_API_IS/rest/CS_TabelasFinanceiro/csicp_ff003_Get_List_EspecieTitulo_Simples`,
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

export { GetListEspecieCombo };
