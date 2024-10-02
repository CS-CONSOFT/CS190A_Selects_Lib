import { URLBase } from '../configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { FormaPagamentoCompleto, ApiResponseFormaPagamento } from '@/types/basico/forma_de_pagamento/bb026_formadepagamento';
import type { FormaPagamentoById } from '@/types/basico/forma_de_pagamento/bb026_GetFormaDePagamentoById';
import type { FatorAcrescimoCompleto } from '@/types/basico/forma_de_pagamento/bb017_fatordeacrescimo';

function GetFormasDePagamentoCompleto(
    tenant: number | undefined,
    active: boolean,
    count: boolean,
    search: string,
    currentpage: number,
    pagesize: number
): Promise<AxiosResponse<ApiResponseFormaPagamento<FormaPagamentoCompleto>>> {
    return axios.get<ApiResponseFormaPagamento<FormaPagamentoCompleto>>(
        `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb026_Get_List_FPagtoCompleto`,
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

const GetFormaDePagamentoById = async (tenantId: number | undefined, in_bb026_id: string): Promise<FormaPagamentoById> => {
    const url = `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb026_Get_FormaPagto`;

    try {
        const response: AxiosResponse<FormaPagamentoById> = await axios.get(url, {
            headers: {
                tenant_id: tenantId,
                in_bb026_id: in_bb026_id
            }
        });

        return response.data;
    } catch (error) {
        console.error('Erro ao buscar forma de pagamento:', error);
        throw error;
    }
};

const GetFatorAcrescimoById = async (tenantId: number | undefined, in_bb017_id: string): Promise<FatorAcrescimoCompleto> => {
    const url = `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb017_Get_FatorAcrescimo`;

    try {
        const response: AxiosResponse<FatorAcrescimoCompleto> = await axios.get(url, {
            headers: {
                tenant_id: tenantId,
                in_bb017_id: in_bb017_id
            }
        });

        return response.data;
    } catch (error) {
        console.error('Erro ao buscar fator de acréscimo:', error);
        throw error;
    }
};

export { GetFormasDePagamentoCompleto, GetFormaDePagamentoById, GetFatorAcrescimoById };
