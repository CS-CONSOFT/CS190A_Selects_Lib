import { URLBase } from '../../../services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { ComboContas, ApiResponseCombo } from '../../../types/crm/combos/combo_ContasTypes';

function getListContasCombo(
    tenant: number | undefined,
    modRelacaoId: number | undefined
): Promise<AxiosResponse<ApiResponseCombo<ComboContas>>> {
    return axios.get<ApiResponseCombo<ComboContas>>(`${URLBase}/CSR_BB100_ClienteFor_IS/rest/CS_Contas/csicp_bb012_Get_Contas_Combo`, {
        headers: {
            tenant_id: tenant,
            In_IsActive: true,
            In_IsCount: false,
            in_search: '',
            in_currentPage: 1,
            in_pageSize: 999,
            In_ModRelacaoID: modRelacaoId
        }
    });
}

export { getListContasCombo };
