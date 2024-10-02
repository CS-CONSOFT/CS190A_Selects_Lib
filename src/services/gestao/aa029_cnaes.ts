import { URLBase } from '@/services/configuracoes_axios';
import type { GetCNAEList } from '../../types/gestao/aa029_types';
import axios from 'axios';

export async function cnaeGetList({
    tenant_id,
    in_search,
    in_currentPage,
    in_pageSize
}: {
    tenant_id: number;
    in_search?: string;
    in_currentPage: number;
    in_pageSize: number;
}): Promise<GetCNAEList> {
    const header = {
        tenant_id: tenant_id,
        In_IsCount: 0,
        in_search: in_search,
        in_currentPage: in_currentPage,
        in_pageSize: in_pageSize
    };

    const _response = await axios.get(`${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_Configuracoes/csicp_aa029_Get_CNAE_List`, {
        headers: header
    });
    const res = _response.data;
    return res;
}
