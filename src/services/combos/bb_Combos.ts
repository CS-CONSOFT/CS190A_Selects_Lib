import axios from 'axios';
import { newURLBase, serviceBs101 } from '../../services/configuracoes_axios';
import { ComboTypesBB } from '../../utils/enums/comboTypeBB';
import type { AxiosResponse } from 'axios';
import type { CombosBB } from '../../types/combos/BB/combo_TypesBB';

async function getCombosBB(tenant: number | undefined, comboTypes: ComboTypesBB): Promise<AxiosResponse<CombosBB[]>> {
    try {
        const url = `${newURLBase}${serviceBs101}/v1/combos/b?comboTypes=${encodeURIComponent(comboTypes)}`;
        const headers = { Tenant_ID: tenant };
        return await axios.get<CombosBB[]>(url, { headers });
    } catch (error) {
        console.error('Erro ao obter os combos das tabelas BB:', error);
        throw error;
    }
}

export { getCombosBB };
