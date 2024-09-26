import { URLBase } from '../configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { AgenteCobradorCompleto, Lista_bb006_Completo, Csicp_bb006 } from '@/types/basico/bb006_agentecobrador';
import type { ApiResponse } from '@/types/crm/contas';

function GetAgenteCobradorCompleto(
    tenant: number | undefined,
    active: boolean,
    count: boolean,
    search: string,
    currentpage: number,
    pagesize: number
): Promise<AxiosResponse<ApiResponse<AgenteCobradorCompleto>>> {
    return axios.get<ApiResponse<AgenteCobradorCompleto>>(
        `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb006_Get_List_AgCobradorCompleto`,
        {
            headers: {
                tenant_id: tenant,
                In_IsActive: active,
                In_IsCount: count,
                in_search: search,
                in_currentPage: currentpage,
                in_pageSize: pagesize
            }
        }
    );
}

const GetAgenteCobradorById = async (tenantId: number | undefined, in_bb006_id: string): Promise<Lista_bb006_Completo> => {
    const url = `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb006_Get_AgCobrador`;

    try {
        const response: AxiosResponse<Lista_bb006_Completo> = await axios.get(url, {
            headers: {
                tenant_id: tenantId
            },
            params: {
                in_bb006_id: in_bb006_id
            }
        });

        return response.data;
    } catch (error) {
        console.error('Erro ao buscar agente cobrador:', error);
        throw error;
    }
};

const SaveAgenteCobrador = async (tenantId: number | undefined, AgenteCobrador: Csicp_bb006): Promise<AxiosResponse<any>> => {
    try {
        const response = await axios.post(
            `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb006_Save_AgCobrador`,
            AgenteCobrador,
            {
                headers: {
                    tenant_id: tenantId
                }
            }
        );
        return response;
    } catch (error) {
        console.error('Erro ao salvar agente cobrador:', error);
        throw error;
    }
};

const DeleteAgenteCobrador = async (tenantId: number | undefined, bb006_id: string): Promise<AxiosResponse<any>> => {
    try {
        const response = await axios.delete(`${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb006_Delete_AgCobrador`, {
            headers: {
                tenant_id: tenantId
            },
            params: {
                in_bb006_id: bb006_id
            }
        });
        return response;
    } catch (error) {
        console.error('Erro ao deletar agente cobrador:', error);
        throw error;
    }
};

const SoftDeleteAgenteCobrador = async (tenantId: number | undefined, bb006_Id: string): Promise<AxiosResponse<any>> => {
    try {
        const response = await axios.delete(
            `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb006_SoftDelete_AgCobrador`,
            {
                headers: {
                    tenant_id: tenantId
                },
                params: {
                    in_bb006_id: bb006_Id
                }
            }
        );
        return response;
    } catch (error) {
        console.error('Erro ao inativar agente cobrador:', error);
        throw error;
    }
};

export { GetAgenteCobradorCompleto, GetAgenteCobradorById, SaveAgenteCobrador, DeleteAgenteCobrador, SoftDeleteAgenteCobrador };
