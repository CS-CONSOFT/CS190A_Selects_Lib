<template>
    <cs_SelectConvenios class="mb-5" :Prm_isObrigatorio="false" />

    <cs_SelectPaises class="mb-5" :Prm_isObrigatorio="false" />

    <cs_SelectVencimento class="mb-5" v-model="modelo" :Prm_isObrigatorio="false" />

    <cs_SelectNaturezaOperacao class="mb-5" :Prm_isObrigatorio="false" />

    <v-btn color="primary" @click="abrirPopup">Consultar CNPJ</v-btn>

    <cs_InputCPF class="mb-5" :Prm_isObrigatorio="true" :Prm_limpavel="true" @cpf-limpo="capturarCpfLimpo" />

    <cs_PopUpConsultarCnpj :Prm_isVisivel="isPopupOpen" @close="isPopupOpen = false" @cnpjData="handleCnpjData" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import cs_SelectConvenios from '../components/selects/cs_SelectConvenios.vue';
import cs_SelectPaises from '../components/selects/cs_SelectPaises.vue';
import cs_SelectVencimento from '../components/selects/cs_SelectVencimento.vue';
import cs_PopUpConsultarCnpj from '../components/popup/cs_PopUpConsultarCnpj.vue';
import cs_InputCPF from '../components/campos/cs_InputCPF.vue';
import cs_SelectNaturezaOperacao from '../components/selects/cs_SelectNaturezaOperacao.vue';

const modelo = '';
const isPopupOpen = ref(false);
const cnpjData = ref<any | null>(null);

// Abre o popup
function abrirPopup() {
    isPopupOpen.value = true;
}

// Callback para capturar os dados do CNPJ
function handleCnpjData(data: any) {
    cnpjData.value = data;
    console.log('Dados recebidos do CNPJ:', data);
}

function capturarCpfLimpo(cpf: any) {
    console.log('CPF limpo recebido:', cpf);
    // Enviar para a API ou armazenar em uma variável
}
</script>
