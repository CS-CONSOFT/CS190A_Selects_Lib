import axios from 'axios';
import { newURLBase, serviceBs101 } from '../../services/configuracoes_axios';
import type { AxiosResponse } from 'axios';
import type { ComboAA025 } from '../../types/combos/AA025_Paises/combo_TypesAA025';

async function getComboPaises(tenant: number | undefined): Promise<AxiosResponse<ComboAA025[]>> {
    try {
        const url = `${newURLBase}${serviceBs101}/v1/combos/pais`;
        const headers = { Tenant_ID: tenant };
        return await axios.get<ComboAA025[]>(url, { headers });
    } catch (error) {
        console.error('Erro ao obter a lista de países:', error);
        throw error;
    }
}
2;

export { getComboPaises };
