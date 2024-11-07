import { URLBase } from '../../../services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { ZonaSimples, ApiResponse } from '../../../types/basico/zona/bb010_zona';

function GetListZonas(tenant_id: number | undefined): Promise<AxiosResponse<ApiResponse<ZonaSimples>>> {
    return axios.get<ApiResponse<ZonaSimples>>(`${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb010_Get_List_Zona`, {
        headers: {
            tenant_id: tenant_id,
            In_IsActive: true,
            In_IsCount: false,
            in_search: '',
            in_currentPage: 1,
            in_pageSize: 999
        }
    });
}

export { GetListZonas };
