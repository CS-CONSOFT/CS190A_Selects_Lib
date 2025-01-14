import axios from 'axios';
import { URLBaseCombo } from '../../services/configuracoes_axios';
import type { AxiosResponse } from 'axios';
import type { ComboAA027 } from '../../types/combos/AA027_Ufs/combo_TypesAA027';

async function getComboUfs(tenant: number | undefined, paisId: string): Promise<AxiosResponse<ComboAA027[]>> {
    try {
        const url = `${URLBaseCombo}/api/v1/combos/uf?paisId=${encodeURIComponent(paisId)}`;
        const headers = { Tenant_ID: tenant };
        return await axios.get<ComboAA027[]>(url, { headers });
    } catch (error) {
        console.error('Erro ao obter a lista de UFs:', error);
        throw error;
    }
}

export { getComboUfs };
