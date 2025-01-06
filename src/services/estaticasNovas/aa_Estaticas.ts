import { NewURLBase } from '../../services/configuracoes_axios';
import axios from 'axios';
import { StaticTypeAA } from '@/utils/enums/staticTypeAA';
import type { AxiosResponse } from 'axios';
import type { EstaticasAA } from '@/types/estaticasNovas/AA/estaticaTypes_AA';

async function getEstaticasAA(staticType: StaticTypeAA): Promise<AxiosResponse<EstaticasAA[]>> {
    try {
        const url = `${NewURLBase}/api/v1/combo/a?staticType=${encodeURIComponent(staticType)}`;
        return await axios.get<EstaticasAA[]>(url);
    } catch (error) {
        console.error('Erro ao obter as estáticas AA:', error);
        throw error;
    }
}

export { getEstaticasAA };
