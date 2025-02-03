import axios from 'axios';
import { newURLBase } from '../../services/configuracoes_axios';
import type { AxiosResponse } from 'axios';
import type { ComboAA028 } from '../../types/combos/AA028_Cidades/combo_TypesAA028';

async function getComboCidades(tenant: number | undefined, ufId: string, search: string): Promise<AxiosResponse<ComboAA028[]>> {
    try {
        const url = `${newURLBase}/api/v1/combos/cidade?ufId=${encodeURIComponent(ufId)}&search=${encodeURIComponent(search)}`;
        const headers = { Tenant_ID: tenant };
        return await axios.get<ComboAA028[]>(url, { headers });
    } catch (error) {
        console.error('Erro ao obter a lista de cidades:', error);
        throw error;
    }
}

export { getComboCidades };
