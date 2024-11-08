import axios from 'axios';
import type { CNPJ, CnpjErrorsType } from '@/types/Outros/CnpjTypes';

type CnpjResponse = CNPJ | CnpjErrorsType;

export const getCnpj = async (cnpj: string): Promise<CnpjResponse> => {
    try {
        const response = await axios.get<CNPJ>(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 400) {
            return error.response.data as CnpjErrorsType;
        }

        throw new Error('Erro na consulta do CNPJ');
    }
};
