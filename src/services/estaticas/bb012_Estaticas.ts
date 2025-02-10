import axios from 'axios';
import { newURLBase, serviceSt102 } from '../../services/configuracoes_axios';
import { StaticTypesBB012 } from '../../utils/enums/staticTypesBB012';
import type { AxiosResponse } from 'axios';
import type { EstaticasBB012 } from '../../types/estaticas/Clientes_BB012/estaticasTypes_BB012';

async function getEstaticasBB012(staticType: StaticTypesBB012): Promise<AxiosResponse<EstaticasBB012[]>> {
    try {
        const url = `${newURLBase}${serviceSt102}/v1/combo/cliente?staticType=${encodeURIComponent(staticType)}`;
        return await axios.get<EstaticasBB012[]>(url);
    } catch (error) {
        console.error('Erro ao obter as estáticas BB:', error);
        throw error;
    }
}

export { getEstaticasBB012 };
