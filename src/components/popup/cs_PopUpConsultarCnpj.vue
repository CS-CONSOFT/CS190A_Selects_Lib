<template>
    <v-dialog v-model="isDialogOpen" max-width="700px" persistent>
        <v-card>
            <v-card-title class="text-h6 d-flex">
                Consultar CNPJ
                <v-spacer></v-spacer>
                <v-btn icon @click="fecharPopup">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text>
                <v-text-field
                    v-model="cnpjInput"
                    variant="solo-filled"
                    dense
                    :rules="validationRules"
                    placeholder="Digite o CNPJ"
                    v-mask="cnpjMask"
                    label="CNPJ"
                    clearable
                    @click:clear="limparDados"
                    @input="onCnpjInputChange"
                />
                <v-alert v-if="apiError" type="error" class="mt-2" dense>
                    {{ apiError }}
                </v-alert>
                <div v-if="cnpjData" class="mt-4 pa-0">
                    <div>
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
                    </div>
                    <div class="d-flex mt-2">
                        <v-col cols="6" class="pa-0 ma-0">
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
                        </v-col>
                        <v-col cols="6" class="pa-0">
                            <div>
                                <h4>Contato</h4>
                                <v-divider></v-divider>
                            </div>
                            <p><strong>Telefone 1:</strong> {{ cnpjData.ddd_telefone_1 || 'Não informado' }}</p>
                            <p><strong>Telefone 2:</strong> {{ cnpjData.ddd_telefone_2 || 'Não informado' }}</p>
                            <p><strong>Email:</strong> {{ cnpjData.email || 'Não informado' }}</p>
                        </v-col>
                    </div>
                    <div class="mt-2">
                        <h4>Detalhes Empresariais</h4>
                        <v-divider></v-divider>
                    </div>
                    <p><strong>CNAE Fiscal:</strong> {{ cnpjData.cnae_fiscal }} - {{ cnpjData.cnae_fiscal_descricao }}</p>
                    <p><strong>Capital Social:</strong> R$ {{ cnpjData.capital_social.toLocaleString('pt-BR') }}</p>
                    <p><strong>Opção pelo Simples:</strong> {{ cnpjData.opcao_pelo_simples ? 'Sim' : 'Não' }}</p>
                    <p><strong>Opção pelo MEI:</strong> {{ cnpjData.opcao_pelo_mei ? 'Sim' : 'Não' }}</p>
                </div>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" :disabled="!cnpjData" @click="enviarCadastro"> Enviar Cadastro </v-btn>
                <v-btn text @click="fecharPopup">Fechar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { mask } from 'vue-the-mask';
import { getCnpj } from '../../services/outros/receita/getcnpj';

// Props
const props = defineProps({
    Prm_isVisivel: Boolean // Controle de visibilidade vindo do pai
});

// Emits
const emit = defineEmits<{
    (e: 'cnpjData', data: any): void;
    (e: 'close'): void;
}>();

// Reatividade
const isDialogOpen = ref(props.Prm_isVisivel); // Estado interno do diálogo
const cnpjInput = ref(''); // Entrada do CNPJ
const cnpjData = ref<any>(null); // Dados retornados pela consulta
const apiError = ref<string | null>(null); // Erro na consulta da API
const cnpjMask = '##.###.###/####-##';

// Sincroniza a prop com o estado interno
watch(
    () => props.Prm_isVisivel,
    (newValue) => {
        isDialogOpen.value = newValue;
    }
);

// Fecha o popup e emite o evento para o pai
function fecharPopup() {
    isDialogOpen.value = false;
    limparDados();
    emit('close');
}

// Validação de CNPJ
function validarCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/\D/g, '');
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    return resultado === parseInt(digitos.charAt(1));
}

// Validações
const validationRules = computed(() => [
    (v: string) => {
        const cleanValue = v.replace(/\D/g, '');
        return cleanValue.length === 14 ? validarCNPJ(cleanValue) || 'CNPJ inválido' : true;
    }
]);

// Detecta mudanças no CNPJ e faz a pesquisa automaticamente
async function onCnpjInputChange() {
    const cleanCnpj = cnpjInput.value.replace(/\D/g, '');
    if (cleanCnpj.length === 14) {
        await consultarCnpj();
    }
}

// Consulta o CNPJ na API
async function consultarCnpj() {
    const cleanCnpj = cnpjInput.value.replace(/\D/g, '');
    if (!validarCNPJ(cleanCnpj)) {
        apiError.value = 'CNPJ inválido';
        return;
    }

    apiError.value = null; // Limpa erros anteriores
    try {
        const data = await getCnpj(cleanCnpj);
        cnpjData.value = data;
    } catch (error) {
        apiError.value = 'Erro ao consultar o CNPJ.';
        console.error(error);
    }
}

// Envia os dados para o componente pai
function enviarCadastro() {
    if (cnpjData.value) {
        emit('cnpjData', cnpjData.value);
        limparDados();
        fecharPopup();
    }
}

// Limpa os dados do CNPJ
function limparDados() {
    cnpjInput.value = '';
    cnpjData.value = null;
    apiError.value = null;
}
</script>

<script lang="ts">
export default {
    directives: {
        mask
    }
};
</script>
