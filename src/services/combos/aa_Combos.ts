import axios from 'axios';
import { newURLBase, serviceBs101 } from '../../services/configuracoes_axios';
import { ComboTypesAA } from '../../utils/enums/comboTypeAA';
import type { AxiosResponse } from 'axios';
import type { CombosAA } from '../../types/combos/AA/combo_TypesAA';

async function getCombosAA(tenant: number | undefined, comboTypes: ComboTypesAA): Promise<AxiosResponse<CombosAA[]>> {
    try {
        const url = `${newURLBase}${serviceBs101}/v1/combos/a?comboTypes=${encodeURIComponent(comboTypes)}`;
        const headers = { Tenant_ID: tenant };
        return await axios.get<CombosAA[]>(url, { headers });
    } catch (error) {
        console.error('Erro ao obter os combos das tabelas AA:', error);
        throw error;
    }
}

export { getCombosAA };
