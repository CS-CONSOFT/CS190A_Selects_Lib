import axios from 'axios';
import { newURLBase, serviceSt102 } from '../../services/configuracoes_axios';
import { StaticTypeBB } from '../../utils/enums/staticTypeBB';
import type { AxiosResponse } from 'axios';
import type { EstaticasBB } from '../../types/estaticas/BB/estaticasTypes_BB';

async function getEstaticasBB(staticType: StaticTypeBB): Promise<AxiosResponse<EstaticasBB[]>> {
    try {
        const url = `${newURLBase}${serviceSt102}/v1/combo/b?staticType=${encodeURIComponent(staticType)}`;
        return await axios.get<EstaticasBB[]>(url);
    } catch (error) {
        console.error('Erro ao obter as estáticas BB:', error);
        throw error;
    }
}

export { getEstaticasBB };
