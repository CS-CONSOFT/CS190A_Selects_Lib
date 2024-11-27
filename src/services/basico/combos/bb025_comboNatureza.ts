import { URLBase } from '../../configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { NaturezaCompleto, ApiResponseNatureza } from '../../../types/basico/natureza/bb025_naturezaOperacao';

function GetNaturezaCombo(tenant: number | undefined): Promise<AxiosResponse<ApiResponseNatureza<NaturezaCompleto>>> {
    return axios.get<ApiResponseNatureza<NaturezaCompleto>>(
        `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb025_Get_List_NaturezaCompleto`,
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

export { GetNaturezaCombo };
