import { URLBase } from '../configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { CentroDeCustoCompleto, Csicp_bb005_Completo, Csicp_bb005 } from '@/types/basico/centro_de_custo/bb005_centrodecusto';
import type { ApiResponse } from '@/types/crm/contas';

function GetCentroDeCustoCompleto(
    tenant: number | undefined,
    active: boolean,
    count: boolean,
    search: string,
    currentpage: number,
    pagesize: number
): Promise<AxiosResponse<ApiResponse<CentroDeCustoCompleto>>> {
    return axios.get<ApiResponse<CentroDeCustoCompleto>>(
        `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb005_Get_List_CentroDeCustoCompleto`,
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

const GetCentroDeCustoById = async (tenantId: number | undefined, in_bb005_id: string): Promise<Csicp_bb005_Completo> => {
    const url = `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb005_Get_CentroDeCusto`;

    try {
        const response: AxiosResponse<Csicp_bb005_Completo> = await axios.get(url, {
            headers: {
                tenant_id: tenantId
            },
            params: {
                in_bb005_id: in_bb005_id
            }
        });

        return response.data;
    } catch (error) {
        console.error('Erro ao buscar Centro de Custo:', error);
        throw error;
    }
};

const SaveCentroDeCusto = async (tenantId: number | undefined, centroDeCusto: Csicp_bb005): Promise<AxiosResponse<any>> => {
    try {
        const response = await axios.post(
            `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb005_Save_CentroDeCusto`,
            centroDeCusto,
            {
                headers: {
                    tenant_id: tenantId
                }
            }
        );
        return response;
    } catch (error) {
        console.error('Erro ao salvar centro de custo:', error);
        throw error;
    }
};

const DeleteCentroDeCusto = async (tenantId: number | undefined, bb005_Id: string): Promise<AxiosResponse<any>> => {
    try {
        const response = await axios.delete(
            `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb005_Delete_CentroDeCusto`,
            {
                headers: {
                    tenant_id: tenantId
                },
                params: {
                    in_bb005_id: bb005_Id
                }
            }
        );
        return response;
    } catch (error) {
        console.error('Erro ao deletar centro de custo:', error);
        throw error;
    }
};

const SoftDeleteCentroDeCusto = async (tenantId: number | undefined, bb005_Id: string): Promise<AxiosResponse<any>> => {
    try {
        const response = await axios.delete(
            `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb005_SoftDelete_CentroDeCusto`,
            {
                headers: {
                    tenant_id: tenantId
                },
                params: {
                    in_bb005_id: bb005_Id
                }
            }
        );
        return response;
    } catch (error) {
        console.error('Erro ao inativar centro de custo:', error);
        throw error;
    }
};

export { GetCentroDeCustoById, GetCentroDeCustoCompleto, SaveCentroDeCusto, DeleteCentroDeCusto, SoftDeleteCentroDeCusto };
