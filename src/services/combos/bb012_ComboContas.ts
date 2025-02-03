import axios from 'axios';
import { newURLBase } from '../../services/configuracoes_axios';
import type { AxiosResponse } from 'axios';
import type { CombosBB012 } from '../../types/combos/BB012_Contas/combo_TypesBB012';

async function getComboContas(tenant: number | undefined, modRel: string, search: string): Promise<AxiosResponse<CombosBB012[]>> {
    try {
        const url = `${newURLBase}/api/v1/bb012/combo?modRel=${encodeURIComponent(modRel)}&search=${encodeURIComponent(search)}`;
        const headers = { Tenant_ID: tenant };
        return await axios.get<CombosBB012[]>(url, { headers });
    } catch (error) {
        console.error('Erro ao obter a lista de contas:', error);
        throw error;
    }
}

export { getComboContas };
