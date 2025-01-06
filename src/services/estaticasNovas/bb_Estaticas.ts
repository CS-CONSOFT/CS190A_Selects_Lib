import { NewURLBase } from '../../services/configuracoes_axios';
import axios from 'axios';
import { StaticTypeBB } from '@/utils/enums/staticTypeBB';
import type { AxiosResponse } from 'axios';
import type { EstaticasBB } from '@/types/estaticasNovas/BB/estaticasTypes_BB';

async function getEstaticasBB(staticType: StaticTypeBB): Promise<AxiosResponse<EstaticasBB[]>> {
    try {
        const url = `${NewURLBase}/api/v1/combo/b?staticType=${encodeURIComponent(staticType)}`;
        return await axios.get<EstaticasBB[]>(url);
    } catch (error) {
        console.error('Erro ao obter as estáticas BB:', error);
        throw error;
    }
}

export { getEstaticasBB };
