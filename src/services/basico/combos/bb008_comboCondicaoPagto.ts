import { URLBase } from '@/services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { ComboCondicaoPagto, ApiResponseBB008Combo } from '@/types/basico/condicao_de_pagamento/combos/Combo_CondicaoPagtoTypes';

function getListCondicaoPagtoCombo(tenant: number | undefined): Promise<AxiosResponse<ApiResponseBB008Combo<ComboCondicaoPagto>>> {
    return axios.get<ApiResponseBB008Combo<ComboCondicaoPagto>>(
        `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb008_Get_List_CondicaoPagto`,
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

export { getListCondicaoPagtoCombo };
