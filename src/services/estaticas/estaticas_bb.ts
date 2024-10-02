import { URLBase } from '@/services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { EstaticasBB } from '@/types/basico/estaticas/BB/bb_estaticas';

async function getListEstaticasBB(): Promise<AxiosResponse<EstaticasBB>> {
    try {
        return await axios.get<EstaticasBB>(`${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_Estaticas/Get_Estaticas_BB`);
    } catch (error) {
        console.error('Erro ao obter as estáticas BB:', error);
        throw error;
    }
}

export { getListEstaticasBB };
