import axios from 'axios';
import { NewURLBase } from '../../services/configuracoes_axios';
import { StaticTypeSPED } from '../../utils/enums/staticTypeSPED';
import type { AxiosResponse } from 'axios';
import type { EstaticasSPED } from '../../types/estaticasNovas/SPED/estaticasTypes_SPED';

async function getEstaticasSPED(staticType: StaticTypeSPED): Promise<AxiosResponse<EstaticasSPED[]>> {
    try {
        const url = `${NewURLBase}/api/v1/combo/sped?staticType=${encodeURIComponent(staticType)}`;
        return await axios.get<EstaticasSPED[]>(url);
    } catch (error) {
        console.error('Erro ao obter as estáticas AA:', error);
        throw error;
    }
}

export { getEstaticasSPED };
