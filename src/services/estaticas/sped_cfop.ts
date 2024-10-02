import { URLBase } from '@/services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { EstaticasSpedCFOP } from '@/types/basico/estaticas/SPED/sped_in_cfop_estaticas';

async function getListEstaticasSpedCFOP(): Promise<AxiosResponse<EstaticasSpedCFOP>> {
    try {
        return await axios.get<EstaticasSpedCFOP>(`${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_Estaticas/Get_SPED_Static1`);
    } catch (error) {
        console.error('Erro ao obter as estáticas do SPED CFOP:', error);
        throw error;
    }
}

export { getListEstaticasSpedCFOP };
