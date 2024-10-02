import { URLBase } from '@/services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { EstaticasBB012 } from '@/types/basico/estaticas/BB/bb012_estaticas';

async function getListEstaticasBB012(): Promise<AxiosResponse<EstaticasBB012>> {
    try {
        return await axios.get<EstaticasBB012>(`${URLBase}/CSR_BB100_ClienteFor_IS/rest/CS_Contas/bb012_Estaticas`);
    } catch (error) {
        console.error('Erro ao obter as estáticas da tabela BB012:', error);
        throw error;
    }
}

export { getListEstaticasBB012 };
