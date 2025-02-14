import axios from 'axios';
import { newURLBase, serviceBs101 } from '../../services/configuracoes_axios';
import type { AxiosResponse } from 'axios';
import type { ComboAA027 } from '../../types/combos/AA027_Ufs/combo_TypesAA027';

async function getComboUfs(tenant: number | undefined, paisId: string): Promise<AxiosResponse<ComboAA027[]>> {
    try {
        const url = `${newURLBase}${serviceBs101}/v1/combos/uf?paisId=${encodeURIComponent(paisId)}`;
        const headers = { Tenant_ID: tenant };
        return await axios.get<ComboAA027[]>(url, { headers });
    } catch (error) {
        console.error('Erro ao obter a lista de UFs:', error);
        throw error;
    }
}

export { getComboUfs };
