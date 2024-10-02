import { URLBase } from '../configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type {
    CondicaoPagamentoCompleto,
    ApiResponseCondicaoPagamento
} from '@/types/basico/condicao_de_pagamento/bb008_condicaodepagamento';

function GetCondicaoDePagamentoCompleto(
    tenant: number | undefined,
    active: boolean,
    count: boolean,
    search: string,
    currentpage: number,
    pagesize: number
): Promise<AxiosResponse<ApiResponseCondicaoPagamento<CondicaoPagamentoCompleto>>> {
    return axios.get<ApiResponseCondicaoPagamento<CondicaoPagamentoCompleto>>(
        `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb008_Get_List_CondicaoPagto`,
        {
            headers: {
                tenant_id: tenant,
                In_IsActive: active,
                In_IsCount: count,
                in_search: search,
                in_currentPage: currentpage,
                in_pageSize: pagesize
            }
        }
    );
}

export { GetCondicaoDePagamentoCompleto };
