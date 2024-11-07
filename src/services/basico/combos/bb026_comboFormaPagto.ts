import { URLBase } from '../../../services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { ComboFormaPagto, ApiResponseBB026Combo } from '../../../types/basico/forma_de_pagamento/combos/Combo_FormaPagto';

function getListFormaPagtoCombo(tenant: number | undefined): Promise<AxiosResponse<ApiResponseBB026Combo<ComboFormaPagto>>> {
    return axios.get<ApiResponseBB026Combo<ComboFormaPagto>>(
        `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb026_Get_List_FormaPagto`,
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

export { getListFormaPagtoCombo };
