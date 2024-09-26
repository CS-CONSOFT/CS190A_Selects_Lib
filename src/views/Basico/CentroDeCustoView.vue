<template>
    <v-container fluid>
        <v-card flat class="d-flex my-2 px-4 py-3 align-center rounded-lg">
            <v-row class="align-center">
                <v-col cols="3">
                    <v-text-field v-model="search" append-inner-icon="mdi-magnify" label="Pesquisar" single-line hide-details clearable />
                </v-col>
            </v-row>
        </v-card>
        <v-card class="border rounded-lg" elevation="0">
            <v-data-table
                :headers="headers"
                :items="items"
                :items-per-page="itemsPerPage"
                :loading="loading"
                hide-default-footer
                loading-text="Carregando dados..."
                class="rounded-lg month-table"
                :search="search"
            >
                <template v-slot:top>
                    <v-toolbar title="Centro de Custo" class="rounded-t">
                        <v-row class="d-flex flex-row-reverse">
                            <v-col cols="auto" class="d-flex align-center">
                                <v-btn v-if="active" prepend-icon="mdi-cancel" flat class="mr-2 bg-error" @click="fetchInactive">
                                    Inativos
                                </v-btn>
                                <v-btn v-else prepend-icon="mdi-delete-empty" flat class="bg-secondary mr-2" @click="fetchActive">
                                    Ativos
                                </v-btn>
                                <v-btn prepend-icon="mdi-plus" flat class="bg-primary mr-4" @click="openDialog"> Centro de Custo </v-btn>
                            </v-col>
                        </v-row>
                    </v-toolbar>
                </template>
                <template v-slot:bottom>
                    <v-row class="d-flex align-center">
                        <v-col cols="2">
                            <v-select
                                v-model="itemsPerPage"
                                class="pa-2 mr-4"
                                label="Itens por página"
                                :items="[5, 10, 15, 25, 50]"
                                hide-details
                            ></v-select>
                        </v-col>
                        <v-col cols="8" class="d-flex justify-center">
                            <v-pagination
                                v-model="page"
                                :length="pageCount"
                                next-icon="mdi-menu-right"
                                prev-icon="mdi-menu-left"
                            ></v-pagination>
                        </v-col>
                    </v-row>
                </template>
                <template v-slot:no-data>
                    <p>Nenhum dado encontrado.</p>
                </template>
                <template v-slot:progress>
                    <v-progress-linear v-if="loading" color="blue" height="10" indeterminate></v-progress-linear>
                </template>
                <template v-slot:item.Ativo="{ item }">
                    <v-chip :color="item.Ativo ? 'success' : 'error'" class="font-weight-bold" rounded="lg" size="small">
                        {{ item.Ativo ? 'Ativo' : 'Inativo' }}
                    </v-chip>
                </template>

                <template v-slot:item.actions="{ item }">
                    <v-icon small @click="openEditDialog(item)"> mdi-pencil </v-icon>
                    <v-icon small @click="confirmDelete(item)"> mdi-delete </v-icon>
                    <v-icon small @click="confirmSoftDelete(item)">
                        {{ active ? 'mdi-cancel' : 'mdi-check' }}
                    </v-icon>
                </template>
            </v-data-table>
        </v-card>
    </v-container>

    <v-dialog v-model="dialog" max-width="500">
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ itemToEdit ? 'Editar' : 'Adicionar' }} Centro de Custo</span>
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field v-model="var_Codigo" label="Código" outlined dense></v-text-field>
                    <v-text-field v-model="var_NomeCCusto" label="Centro de Custo" outlined dense></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="CreateOrUpdateCentroDeCusto">Salvar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="confirmDialog" max-width="400">
        <v-card>
            <v-card-title class="text-h5">Confirmar Exclusão</v-card-title>
            <v-card-text>Tem certeza de que deseja excluir este centro de custo?</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="cancelDelete">Cancelar</v-btn>
                <v-btn color="red darken-1" text @click="deleteCentroDeCustoConfirmed">Excluir</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="confirmSoftDeleteDialog" max-width="400">
        <v-card>
            <v-card-title class="text-h5"> Confirmar {{ active ? 'Inativação' : 'Ativação' }} </v-card-title>
            <v-card-text> Tem certeza de que deseja {{ active ? 'inativar' : 'ativar' }} este centro de custo? </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="cancelSoftDelete">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="softDeleteCentroDeCustoConfirmed">
                    {{ active ? 'Inativar' : 'Ativar' }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :timeout="3000" top v-bind:color="snackbarColor" multi-line>
        {{ snackbarMessage }}
        <template v-slot:actions>
            <v-btn color="white" icon="mdi-close" @click="snackbar = false"></v-btn>
        </template>
    </v-snackbar>
</template>

<script setup lang="ts">
// Import de bibliotecas e etc...
import { ref, onMounted, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
// Import de API's
import {
    GetCentroDeCustoById,
    GetCentroDeCustoCompleto,
    SaveCentroDeCusto,
    DeleteCentroDeCusto,
    SoftDeleteCentroDeCusto
} from '@/services/basico/bb005_centrodecusto';
// Import de Types
import type { CentroDeCustoCompleto, Lista_bb005, Csicp_bb005_Completo, Csicp_bb005 } from '@/types/basico/bb005_centrodecusto';
import type { ApiResponse } from '@/types/crm/contas';
import type { AxiosResponse } from 'axios';

interface Item {
    ID: string;
    Filial: number;
    Codigo: number;
    NomeCCusto: string;
    IsActive: boolean;
}

const headers = ref([
    {
        title: 'Código',
        align: 'start',
        value: 'Codigo',
        width: '10%'
    },
    {
        title: 'Centro de Custo',
        value: 'NomeCCusto',
        sortable: true,
        width: '50%'
    },
    {
        title: 'Ativo',
        value: 'Ativo',
        width: '20%',
        align: 'center'
    },
    {
        title: 'Ações',
        align: 'center',
        value: 'actions',
        sortable: false,
        width: '20%'
    }
]);

const items = ref<Item[]>([]);
const itemsPerPage = ref(10);
const page = ref(1);
const pageCount = ref(1);
const loading = ref(false);
const dialog = ref(false);
const editDialog = ref(false);
const confirmDialog = ref(false);
const confirmSoftDeleteDialog = ref(false);
const itemToDelete = ref<Item | null>(null);
const itemToEdit = ref<Item | null>(null);
const itemToSoftDelete = ref<Item | null>(null);
const authStore = useAuthStore();
const tenant = authStore.user?.TenantId;
const active = ref(true);
const count = false;
const search = ref('');

const var_Id = ref('');
const var_Codigo = ref(0);
const var_NomeCCusto = ref('');
const edit_Codigo = ref(0);
const edit_NomeCCusto = ref('');

const snackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref('');

const showSnackbar = (message: string, color: string) => {
    snackbarMessage.value = message;
    snackbarColor.value = color;
    snackbar.value = true;
};

const fetchActive = () => {
    active.value = true;
    fetchData();
};

const fetchInactive = () => {
    active.value = false;
    fetchData();
};

const fetchData = async () => {
    loading.value = true;
    try {
        const response: AxiosResponse<ApiResponse<CentroDeCustoCompleto>> = await GetCentroDeCustoCompleto(
            tenant,
            active.value,
            count,
            search.value,
            page.value,
            itemsPerPage.value
        );
        console.log(response.data);
        const data = response.data;
        items.value = data.Lista_bb005.map((item: Lista_bb005) => ({
            ID: item.csicp_bb005_Completo.csicp_bb005.ID,
            Codigo: item.csicp_bb005_Completo.csicp_bb005.BB005_Codigo,
            NomeCCusto: item.csicp_bb005_Completo.csicp_bb005.BB005_NomeCCusto,
            Ativo: item.csicp_bb005_Completo.csicp_bb005.BB005_IsActive
        }));
        pageCount.value = Math.ceil(data.PageSize.cs_list_total_itens / itemsPerPage.value);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        showSnackbar('Erro ao buscar dados.', 'error');
    } finally {
        loading.value = false;
    }
};

const closeDialog = () => {
    dialog.value = false;
};

const openDialog = () => {
    dialog.value = true;
    itemToEdit.value = null;
    var_Id.value = '';
    var_Codigo.value = 0;
    var_NomeCCusto.value = '';
};

const openEditDialog = async (item: Item) => {
    dialog.value = true;
    itemToEdit.value = item;
    try {
        const data: Csicp_bb005_Completo = await GetCentroDeCustoById(tenant, item.ID);
        var_Id.value = data.csicp_bb005_Completo.csicp_bb005.ID;
        var_Codigo.value = data.csicp_bb005_Completo.csicp_bb005.BB005_Codigo;
        var_NomeCCusto.value = data.csicp_bb005_Completo.csicp_bb005.BB005_NomeCCusto;
    } catch (error) {
        console.error('Erro ao buscar dados do centro de custo:', error);
        showSnackbar('Erro ao buscar dados do centro de custo', 'error');
    }
};

const CreateOrUpdateCentroDeCusto = async () => {
    try {
        const data: Csicp_bb005 = {
            ID: var_Id.value,
            BB005_Codigo: var_Codigo.value,
            BB005_NomeCCusto: var_NomeCCusto.value,
            BB005_IsActive: true,
            BB005_Filial: 0,
            BB005_ColunaImpressao: 0,
            EmpresaId: authStore.user?.EstabelecimentoId
        };
        await SaveCentroDeCusto(tenant, data);
        showSnackbar('Centro de custo salvo com sucesso', 'success');
        fetchData();
        dialog.value = false;
    } catch (error) {
        console.error('Erro ao salvar o centro de custo:', error);
        showSnackbar('Erro ao salvar o centro de custo', 'error');
    }
};

const confirmDelete = (item: Item) => {
    confirmDialog.value = true;
    itemToDelete.value = item;
};

const cancelDelete = () => {
    confirmDialog.value = false;
};

const deleteCentroDeCustoConfirmed = async () => {
    if (!itemToDelete.value) return;
    try {
        await DeleteCentroDeCusto(tenant, itemToDelete.value.ID);
        showSnackbar('Centro de custo excluído com sucesso', 'success');
        fetchData();
        confirmDialog.value = false;
    } catch (error) {
        console.error('Erro ao excluir o centro de custo:', error);
        showSnackbar('Erro ao excluir o centro de custo', 'error');
    }
};

const confirmSoftDelete = (item: Item) => {
    confirmSoftDeleteDialog.value = true;
    itemToSoftDelete.value = item;
};

const cancelSoftDelete = () => {
    confirmSoftDeleteDialog.value = false;
};

const softDeleteCentroDeCustoConfirmed = async () => {
    if (!itemToSoftDelete.value) return;
    try {
        await SoftDeleteCentroDeCusto(tenant, itemToSoftDelete.value.ID);
        showSnackbar(`Centro de custo ${active.value ? 'inativado' : 'ativado'} com sucesso`, 'success');
        fetchData();
        confirmSoftDeleteDialog.value = false;
    } catch (error) {
        console.error(`Erro ao ${active.value ? 'inativar' : 'ativar'} o centro de custo:`, error);
        showSnackbar(`Erro ao ${active.value ? 'inativar' : 'ativar'} o centro de custo`, 'error');
    }
};

onMounted(() => {
    fetchData();
});

watch([page, itemsPerPage], fetchData);
</script>
