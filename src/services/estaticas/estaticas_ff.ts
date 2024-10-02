import { URLBase } from '../../services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { EstaticasFF } from '../../types/basico/estaticas/FF/ff_estaticas';

async function getListEstaticasFF(): Promise<AxiosResponse<EstaticasFF>> {
    try {
        return await axios.get<EstaticasFF>(`${URLBase}/CSR_FF100_Financeiro_API_IS/rest/CS_Estaticas/Get_Estaticas_FF`);
    } catch (error) {
        console.error('Erro ao obter as estáticas BB:', error);
        throw error;
    }
}

export { getListEstaticasFF };
