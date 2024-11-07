import { URLBase } from '../../services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { EstaticasCRM } from '../../types/estaticas/CRM/crm_estaticas';

async function GetListEstaticasCRM(): Promise<AxiosResponse<EstaticasCRM>> {
    try {
        return await axios.get<EstaticasCRM>(`${URLBase}/CSR_BB100_ClienteFor_IS/rest/CS_Contas/Get_Estaticas_CRM`);
    } catch (error) {
        console.error('Erro ao obter as estáticas CRM:', error);
        throw error;
    }
}

export { GetListEstaticasCRM };
