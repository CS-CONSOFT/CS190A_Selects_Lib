import { URLBase } from '../configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { ResponsavelCompleto, ApiResponseResponsavel } from '@/types/basico/responsavel/bb007_responsavel';
import type { ResponsavelById } from '@/types/basico/responsavel/bb007_GetResponsavelById';

function GetResponsavelCompleto(
    tenant: number | undefined,
    active: boolean,
    count: boolean,
    search: string,
    currentpage: number,
    pagesize: number
): Promise<AxiosResponse<ApiResponseResponsavel<ResponsavelCompleto>>> {
    return axios.get<ApiResponseResponsavel<ResponsavelCompleto>>(
        `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb007_Get_List_ResponsavelCompleto`,
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

const GetResponsavelById = async (tenantId: number | undefined, in_bb007_id: string): Promise<ResponsavelById> => {
    const url = `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb007_Get_Responsavel`;

    try {
        const response: AxiosResponse<ResponsavelById> = await axios.get(url, {
            headers: {
                tenant_id: tenantId,
                in_bb007_id: in_bb007_id
            }
        });

        return response.data;
    } catch (error) {
        console.error('Erro ao buscar responsável:', error);
        throw error;
    }
};

export { GetResponsavelCompleto, GetResponsavelById };
