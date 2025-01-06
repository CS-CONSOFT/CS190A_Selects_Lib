import { NewURLBase } from '../../services/configuracoes_axios';
import axios from 'axios';
import { StaticTypesBB012 } from '@/utils/enums/staticTypesBB012';
import type { AxiosResponse } from 'axios';
import type { EstaticasBB012 } from '@/types/estaticasNovas/Clientes_BB012/estaticasTypes_BB012';

async function getEstaticasBB012(staticType: StaticTypesBB012): Promise<AxiosResponse<EstaticasBB012[]>> {
    try {
        const url = `${NewURLBase}/api/v1/combo/cliente?staticType=${encodeURIComponent(staticType)}`;
        return await axios.get<EstaticasBB012[]>(url);
    } catch (error) {
        console.error('Erro ao obter as estáticas BB:', error);
        throw error;
    }
}

export { getEstaticasBB012 };
