import axios from 'axios';
import { newURLBase, serviceBs101 } from '../../services/configuracoes_axios';
import { ComboTypesFF } from '../../utils/enums/comboTypeFF';
import type { AxiosResponse } from 'axios';
import type { CombosFF } from '../../types/combos/FF/combo_TypesFF';

async function getCombosFF(tenant: number | undefined, comboTypes: ComboTypesFF): Promise<AxiosResponse<CombosFF[]>> {
    try {
        const url = `${newURLBase}${serviceBs101}/v1/combos/f?comboTypes=${encodeURIComponent(comboTypes)}`;
        const headers = { Tenant_ID: tenant };
        return await axios.get<CombosFF[]>(url, { headers });
    } catch (error) {
        console.error('Erro ao obter os combos das tabelas FF:', error);
        throw error;
    }
}

export { getCombosFF };
