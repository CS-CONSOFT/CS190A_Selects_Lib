import { URLBase } from '../../services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { EstaticasAA } from '../../types/estaticas/AA/aa_Estaticas';

async function getListEstaticasAA(): Promise<AxiosResponse<EstaticasAA>> {
    try {
        return await axios.get<EstaticasAA>(`${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_Estaticas/Get_Estaticas_AA`);
    } catch (error) {
        console.error('Erro ao obter as estáticas AA:', error);
        throw error;
    }
}

export { getListEstaticasAA };
