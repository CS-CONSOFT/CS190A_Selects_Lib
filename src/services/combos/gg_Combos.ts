import axios from 'axios';
import { newURLBase, serviceBs101 } from '../../services/configuracoes_axios';
import { ComboTypesGG } from '../../utils/enums/comboTypeGG';
import type { AxiosResponse } from 'axios';
import type { CombosGG } from '../../types/combos/GG/combo_TypesGG';

async function getCombosGG(tenant: number | undefined, comboTypes: ComboTypesGG): Promise<AxiosResponse<CombosGG[]>> {
    try {
        const url = `${newURLBase}${serviceBs101}/v1/combos/g?comboTypes=${encodeURIComponent(comboTypes)}`;
        const headers = { Tenant_ID: tenant };
        return await axios.get<CombosGG[]>(url, { headers });
    } catch (error) {
        console.error('Erro ao obter os combos das tabelas GG:', error);
        throw error;
    }
}

export { getCombosGG };
