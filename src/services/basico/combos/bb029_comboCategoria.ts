import { URLBase } from '../../../services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { CategoriaSimples, ApiResponse } from '../../../types/basico/categoria/bb029_categoria';

function getCategoriasCombo(tenant_id: number | undefined): Promise<AxiosResponse<ApiResponse<CategoriaSimples>>> {
    return axios.get<ApiResponse<CategoriaSimples>>(
        `${URLBase}CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb029_Get_List_Categoria`,
        {
            headers: {
                tenant_id: tenant_id,
                In_IsActive: true,
                In_IsCount: false,
                in_search: '',
                in_currentPage: 1,
                in_pageSize: 999
            }
        }
    );
}

export { getCategoriasCombo };
