import axios from 'axios';
import type { CEP } from '@/types/enderecamento/CepTypes';

export const getCep = async (cep: number): Promise<CEP> => {
    const response = await axios.get<CEP>(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
};
