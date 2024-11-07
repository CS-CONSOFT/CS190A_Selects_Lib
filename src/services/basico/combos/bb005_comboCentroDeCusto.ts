import { URLBase } from '../../../services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { ComboCentroDeCusto, ApiResponse } from '../../../types/basico/centro_de_custo/combo/Combo_CentroDeCustoTypes';

function GetListCentroDeCustoCombo(tenant: number | undefined): Promise<AxiosResponse<ApiResponse<ComboCentroDeCusto>>> {
    return axios.get<ApiResponse<ComboCentroDeCusto>>(
        `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb005_Get_List_CentroDeCusto`,
        {
            headers: {
                tenant_id: tenant,
                In_IsActive: true,
                In_IsCount: false,
                in_search: '',
                in_currentPage: 1,
                in_pageSize: 999
            }
        }
    );
}

export { GetListCentroDeCustoCombo };
