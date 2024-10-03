import { URLBase } from '@/services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { ComboUsuarios, ApiResponseSY001Combo } from '@/types/basico/usuario/combos/Combo_UsuarioTypes';

function getListUsuariosCombo(tenant: number | undefined): Promise<AxiosResponse<ApiResponseSY001Combo<ComboUsuarios>>> {
    return axios.get<ApiResponseSY001Combo<ComboUsuarios>>(
        `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_sy001_Get_ComboList_Usuario`,
        {
            headers: {
                tenant_id: tenant
            }
        }
    );
}

export { getListUsuariosCombo };
