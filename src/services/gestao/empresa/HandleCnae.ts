import { useAuthStore } from '../../../stores/auth';
import { cnaeGetList } from '../../../services/gestao/aa029_cnaes';
import type { GetCNAEList } from '../../../types/gestao/aa029_types';

export async function handleCnaeGetList({
    in_search,
    in_currentPage,
    in_pageSize
}: {
    in_search?: string;
    in_currentPage: number;
    in_pageSize: number;
}): Promise<GetCNAEList> {
    const tenant = useAuthStore().user!.TenantId;
    const response = await cnaeGetList({
        tenant_id: tenant,
        in_search: in_search,
        in_currentPage: in_currentPage,
        in_pageSize: in_pageSize
    });
    return response;
}
