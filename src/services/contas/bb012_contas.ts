import { URLBase } from '../configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { ApiResponse, EstatisticasResponse, Zona, Atividade, Conta, ContaCompleta } from '@/types/crm/contas';

function GetEstaticas(): Promise<AxiosResponse<ApiResponse<EstatisticasResponse>>> {
    return axios.get<ApiResponse<EstatisticasResponse>>(`${URLBase}/CSR_BB100_ClienteFor_IS/rest/CS_Contas/bb012_Estaticas`);
}

function GetZonas(
    tenant: number,
    active: boolean,
    count: boolean,
    search: string,
    currentpage: number,
    pagesize: number
): Promise<AxiosResponse<ApiResponse<Zona[]>>> {
    return axios.get<ApiResponse<Zona[]>>(`${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb010_Get_List_Zona`, {
        headers: {
            tenant_id: tenant,
            In_IsActive: active,
            In_IsCount: count,
            in_search: search,
            in_currentPage: currentpage,
            in_pageSize: pagesize
        }
    });
}

function GetListAtividades(
    tenant: number,
    active: boolean,
    count: boolean,
    search: string,
    currentpage: number,
    pagesize: number
): Promise<AxiosResponse<ApiResponse<Atividade[]>>> {
    return axios.get<ApiResponse<Atividade[]>>(
        `${URLBase}/CSR_BB100_Tabelas_LIB/rest/CS_TabelasTotalizacao/csicp_bb011_Get_List_Atividade`,
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

function GetContasList(
    tenant: number,
    active: boolean,
    count: boolean,
    search: string,
    currentpage: number,
    pagesize: number,
    modrelacao: number,
    in_grupo: string
): Promise<AxiosResponse<ApiResponse<Conta[]>>> {
    return axios.get<ApiResponse<Conta[]>>(`${URLBase}/CSR_BB100_ClienteFor_IS/rest/CS_Contas/csicp_bb012_Get_List_Contas`, {
        headers: {
            Tenant_id: tenant,
            In_IsActive: active,
            In_IsCount: count,
            in_search: search,
            in_currentPage: currentpage,
            in_pageSize: pagesize,
            In_ModRelacaoID: modrelacao,
            In_ClauseInt_List_csicp_bb012_GruCta: in_grupo
        }
    });
}

function GetContasListCompleto(
    tenant: number,
    active: boolean,
    count: boolean,
    search: string,
    currentpage: number,
    pagesize: number,
    modrelacao: number,
    in_list_csicp_bb012_grupos: string,
    in_list_csicp_bb012_zona: string
): Promise<AxiosResponse<ApiResponse<ContaCompleta[]>>> {
    return axios.get<ApiResponse<ContaCompleta[]>>(
        `${URLBase}/CSR_BB100_ClienteFor_IS/rest/CS_Contas/csicp_bb012_Get_List_ContasCompleto`,
        {
            headers: {
                Tenant_id: tenant,
                In_IsActive: active,
                In_IsCount: count,
                in_search: search,
                in_currentPage: currentpage,
                in_pageSize: pagesize,
                In_ModRelacaoID: modrelacao,
                In_ClauseInt_List_csicp_bb012_GruCta: in_list_csicp_bb012_grupos,
                In_ClauseInt_List_csicp_bb010_Zona: in_list_csicp_bb012_zona
            }
        }
    );
}

function GetContaById(tenant: number, id: number): Promise<AxiosResponse<ApiResponse<Conta>>> {
    return axios.get<ApiResponse<Conta>>(`${URLBase}/CSR_BB100_ClienteFor_IS/rest/CS_Contas/csicp_bb012_Get_Conta`, {
        params: {
            Tenant_id: tenant,
            In_BB012_ID: id
        }
    });
}

function DeleteConta(tenant: number, id: number): Promise<AxiosResponse<ApiResponse<void>>> {
    return axios.delete<ApiResponse<void>>(`${URLBase}/CSR_BB100_ClienteFor_IS/rest/CS_Contas/csicp_bb012_Delete_Conta`, {
        params: {
            Tenant_id: tenant,
            In_BB012_ID: id
        }
    });
}

export { GetEstaticas, GetZonas, GetListAtividades, GetContasList, GetContasListCompleto, GetContaById, DeleteConta };
