<template>
    <v-dialog v-model="dialogDados" persistent max-width="700">
        <v-card>
            <v-card-title class="pa-4 bg-lightprimary">
                <span class="text-h5">Consultar CNPJ</span>
            </v-card-title>
            <v-card-text>
                <cs_InputCnpj :Prm_limpavel="true" :Prm_isObrigatorio="true" Prm_etiqueta="CNPJ" @cnpjData="handleCnpjData" />
            </v-card-text>
            <div v-if="cnpjData.cnpj != ''" class="pa-0">
                <v-card-text class="pt-1">
                    <div>
                        <h4>Informações Gerais</h4>
                        <v-divider></v-divider>
                    </div>
                    <p><strong>Razão Social:</strong> {{ cnpjData.razao_social }}</p>
                    <p><strong>Nome Fantasia:</strong> {{ cnpjData.nome_fantasia }}</p>
                    <p><strong>CNPJ:</strong> {{ cnpjData.cnpj }}</p>
                    <p><strong>Situação Cadastral:</strong> {{ cnpjData.descricao_situacao_cadastral }}</p>
                    <p><strong>Data de Início de Atividade:</strong> {{ cnpjData.data_inicio_atividade }}</p>
                    <p><strong>Natureza Jurídica:</strong> {{ cnpjData.codigo_natureza_juridica }}</p>
                    <p><strong>Porte:</strong> {{ cnpjData.porte }}</p>
                </v-card-text>
                <div class="d-flex">
                    <v-col cols="6" class="pa-0">
                        <v-card-text>
                            <div>
                                <h4>Endereço</h4>
                                <v-divider></v-divider>
                            </div>
                            <p><strong>CEP:</strong> {{ cnpjData.cep }}</p>
                            <p>
                                <strong>Logradouro:</strong> {{ cnpjData.descricao_tipo_de_logradouro }} {{ cnpjData.logradouro }},
                                {{ cnpjData.numero }}
                            </p>
                            <p><strong>Complemento:</strong> {{ cnpjData.complemento }}</p>
                            <p><strong>Bairro:</strong> {{ cnpjData.bairro }}</p>
                            <p><strong>Município:</strong> {{ cnpjData.municipio }}</p>
                            <p><strong>UF:</strong> {{ cnpjData.uf }}</p>
                        </v-card-text>
                    </v-col>
                    <v-col cols="6" class="pa-0">
                        <v-card-text>
                            <div>
                                <h4>Contato</h4>
                                <v-divider></v-divider>
                            </div>
                            <p><strong>Telefone 1:</strong> {{ cnpjData.ddd_telefone_1 || 'Não informado' }}</p>
                            <p><strong>Telefone 2:</strong> {{ cnpjData.ddd_telefone_2 || 'Não informado' }}</p>
                            <p><strong>Email:</strong> {{ cnpjData.email || 'Não informado' }}</p>
                        </v-card-text>
                    </v-col>
                </div>
                <v-card-text>
                    <div>
                        <h4>Detalhes Empresariais</h4>
                        <v-divider></v-divider>
                    </div>
                    <p><strong>CNAE Fiscal:</strong> {{ cnpjData.cnae_fiscal }} - {{ cnpjData.cnae_fiscal_descricao }}</p>
                    <p><strong>Capital Social:</strong> R$ {{ cnpjData.capital_social.toLocaleString('pt-BR') }}</p>
                    <p><strong>Opção pelo Simples:</strong> {{ cnpjData.opcao_pelo_simples ? 'Sim' : 'Não' }}</p>
                    <p><strong>Opção pelo MEI:</strong> {{ cnpjData.opcao_pelo_mei ? 'Sim' : 'Não' }}</p>
                </v-card-text>
            </div>

            <template v-slot:actions>
                <v-spacer></v-spacer>

                <v-btn prepend-icon="mdi-share" color="success" variant="flat" @click="emitCnpjData"> Enviar </v-btn>
                <cs_BtnCancelar @click="closeDialogFator" />
            </template>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import cs_InputCnpj from '../campos/cs_InputCnpj.vue';
import cs_BtnCancelar from '../botoes/cs_BtnCancelar.vue';

const dialogDados = ref(false);
const modelo = ref<string>('');

// Variável para armazenar os dados do CNPJ
const cnpjData = ref({
    cnpj: '',
    identificador_matriz_filial: 0,
    descricao_matriz_filial: '',
    razao_social: '',
    nome_fantasia: '',
    situacao_cadastral: 0,
    descricao_situacao_cadastral: '',
    data_situacao_cadastral: '',
    motivo_situacao_cadastral: 0,
    codigo_natureza_juridica: 0,
    data_inicio_atividade: '',
    cnae_fiscal: 0,
    cnae_fiscal_descricao: '',
    descricao_tipo_de_logradouro: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cep: 0,
    uf: '',
    codigo_municipio: 0,
    municipio: '',
    ddd_telefone_1: '',
    ddd_telefone_2: '',
    email: '',
    qualificacao_do_responsavel: 0,
    capital_social: 0,
    porte: 0,
    descricao_porte: '',
    opcao_pelo_simples: false,
    opcao_pelo_mei: false
});

// Define o emit
const emit = defineEmits(['enviarDadosCnpj']);

function handleCnpjData(data: any) {
    cnpjData.value = data;
}

function openDialogFator() {
    dialogDados.value = true;
}

function closeDialogFator() {
    dialogDados.value = false;
    resetCnpjData();
}

function resetCnpjData() {
    cnpjData.value = {
        cnpj: '',
        identificador_matriz_filial: 0,
        descricao_matriz_filial: '',
        razao_social: '',
        nome_fantasia: '',
        situacao_cadastral: 0,
        descricao_situacao_cadastral: '',
        data_situacao_cadastral: '',
        motivo_situacao_cadastral: 0,
        codigo_natureza_juridica: 0,
        data_inicio_atividade: '',
        cnae_fiscal: 0,
        cnae_fiscal_descricao: '',
        descricao_tipo_de_logradouro: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cep: 0,
        uf: '',
        codigo_municipio: 0,
        municipio: '',
        ddd_telefone_1: '',
        ddd_telefone_2: '',
        email: '',
        qualificacao_do_responsavel: 0,
        capital_social: 0,
        porte: 0,
        descricao_porte: '',
        opcao_pelo_simples: false,
        opcao_pelo_mei: false
    };
}

function emitCnpjData() {
    emit('enviarDadosCnpj', cnpjData.value);
}

defineExpose({
    openDialogFator,
    closeDialogFator
});
</script>
