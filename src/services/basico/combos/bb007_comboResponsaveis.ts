import { URLBase } from '@/services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { ComboResponsaveis, ApiResponseBB007Combo } from '@/types/basico/responsavel/combos/Combo_ResponsaveisTypes';

function getListResponsaveisCombo(tenant: number | undefined): Promise<AxiosResponse<ApiResponseBB007Combo<ComboResponsaveis>>> {
    return axios.get<ApiResponseBB007Combo<ComboResponsaveis>>(
        `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb007_Get_List_Responsavel`,
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

export { getListResponsaveisCombo };
