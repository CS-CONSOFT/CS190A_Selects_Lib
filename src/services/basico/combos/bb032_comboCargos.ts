import { URLBase } from '../../../services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { CargoCompleto, ApiResponse } from '../../../types/basico/cargo/bb032_cargo';

function GetListCargosCombo(tenant: number | undefined): Promise<AxiosResponse<ApiResponse<CargoCompleto>>> {
    return axios.get<ApiResponse<CargoCompleto>>(`${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb032_Get_List_Cargo`, {
        headers: {
            tenant_id: tenant,
            In_IsActive: true,
            In_IsCount: false,
            in_search: '',
            in_currentPage: 1,
            in_pageSize: 999
        }
    });
}

export { GetListCargosCombo };
