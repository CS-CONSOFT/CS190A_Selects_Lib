import { URLBase } from '../configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { AdministradoraCompleto, ApiResponse, Csicp_bb019 } from '@/types/basico/administradora/bb019_administradora';

function GetAdministradoraCompleto(
    tenant: number | undefined,
    active: boolean,
    count: boolean,
    search: string,
    currentpage: number,
    pagesize: number
): Promise<AxiosResponse<ApiResponse<AdministradoraCompleto>>> {
    return axios.get<ApiResponse<AdministradoraCompleto>>(
        `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb019_Get_List_Administradora`,
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

export { GetAdministradoraCompleto };
