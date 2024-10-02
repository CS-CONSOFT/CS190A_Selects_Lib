import { URLBase } from '@/services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { EstaticasSpedIcms } from '@/types/basico/estaticas/SPED/sped_in_icms_estaticas';

async function getListEstaticasSpedICMS(): Promise<AxiosResponse<EstaticasSpedIcms>> {
    try {
        return await axios.get<EstaticasSpedIcms>(`${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_Estaticas/Get_SPED_Static2`);
    } catch (error) {
        console.error('Erro ao obter as estáticas do SPED ICMS:', error);
        throw error;
    }
}

export { getListEstaticasSpedICMS };
