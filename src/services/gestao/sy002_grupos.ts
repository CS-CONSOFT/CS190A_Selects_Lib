import { URLBase } from '@/services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { GruposCompleto, ApiResponseGrupos } from '@/types/gestao/sy002_grupos';

function GetGrupoCompleto(
    tenant: number | undefined,
    active: boolean,
    count: boolean,
    search: string,
    currentpage: number,
    pagesize: number
): Promise<AxiosResponse<ApiResponseGrupos<GruposCompleto>>> {
    return axios.get<ApiResponseGrupos<GruposCompleto>>(
        `${URLBase}/csr_aa100_Gestao_BL/rest/GestaoUsuario/csicp_sy001_Get_List_Usuario_Simples`,
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

export { GetGrupoCompleto };
