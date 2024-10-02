import { URLBase } from '@/services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { UsuarioCompleto, ApiResponseUsuarios } from '@/types/gestao/sy001_usuarios';

function GetUsuarioCompleto(
    tenant: number | undefined,
    active: boolean,
    count: boolean,
    search: string,
    currentpage: number,
    pagesize: number
): Promise<AxiosResponse<ApiResponseUsuarios<UsuarioCompleto>>> {
    return axios.get<ApiResponseUsuarios<UsuarioCompleto>>(
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

export { GetUsuarioCompleto };
