import { URLBase } from '@/services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { ComboCidades, ApiResponseAA028Combo } from '@/types/enderecamento/combos/Combo_CidadeTypes';

function getListaCidadesCombo(
    tenant: number | undefined,
    uf: string | undefined
): Promise<AxiosResponse<ApiResponseAA028Combo<ComboCidades>>> {
    return axios.get<ApiResponseAA028Combo<ComboCidades>>(
        `${URLBase}/CSR_BB100_ClienteFor_IS/rest/CS_Enderecamento/csicp_aa028_Get_Combo_Cidades`,
        {
            headers: {
                tenant_id: tenant,
                in_search: '',
                In_UF_ID: uf
            }
        }
    );
}

export { getListaCidadesCombo };
