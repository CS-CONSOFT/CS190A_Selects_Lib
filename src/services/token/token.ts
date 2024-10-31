import { URLBase } from '@/services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { TokenGenerico } from '@/types/token/TokenTypes';

function GetTokenGenerico(In_Tenant_ID: number | undefined, In_Qualtoken: string): Promise<AxiosResponse<TokenGenerico>> {
    return axios.get<TokenGenerico>(`${URLBase}csr_aa101_systems_cs/rest/CS_TokensTerceiros/CS_Get_TokenGenerico`, {
        params: {
            In_Tenant_ID,
            In_Qualtoken
        }
    });
}

export default GetTokenGenerico;
