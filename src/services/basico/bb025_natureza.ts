import { URLBase } from '../configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { NaturezaCompleto, ApiResponseNatureza } from '@/types/basico/natureza/bb025_naturezaOperacao';

function GetNaturezaCompleto(
    tenant: number | undefined,
    active: boolean,
    count: boolean,
    search: string,
    currentpage: number,
    pagesize: number
): Promise<AxiosResponse<ApiResponseNatureza<NaturezaCompleto>>> {
    return axios.get<ApiResponseNatureza<NaturezaCompleto>>(
        `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb025_Get_List_NaturezaCompleto`,
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

export { GetNaturezaCompleto };
