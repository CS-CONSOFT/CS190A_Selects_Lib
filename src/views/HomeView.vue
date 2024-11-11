<template>
    <v-container fluid>
        <div>
            <cs_InputCPF :Prm_limpavel="false" :Prm_isObrigatorio="true" />
        </div>
        <div>
            <cs_InputCnpj :Prm_limpavel="false" :Prm_isObrigatorio="true" />
        </div>
        <div>
            <cs_InputCelular :Prm_limpavel="false" :Prm_isObrigatorio="true" />
        </div>
        <div>
            <cs_InputNumInteiro Prm_etiqueta="Código" :Prm_limpavel="false" :Prm_isObrigatorio="true" />
        </div>
        <div>
            <cs_InputTelefone :Prm_limpavel="false" :Prm_isObrigatorio="true" />
        </div>
        <div>
            <cs_InputCep :initialCep="cepValue" :readonly="false" :Prm_isObrigatorio="true" @cep-info="handleCepInfo" />
        </div>
        <div>
            <cs_SelectTratamento class="mb-6" :Prm_isObrigatorio="false" />
        </div>
        <div>
            <cs_SelectZona Prm_etiqueta="Venda Rota" :Prm_limpavel="false" :Prm_isObrigatorio="false" />
        </div>
        <div>
            <v-btn @click="abrirPopup">Consultar CNPJ</v-btn>

            <!-- Componente de popup -->
            <PopupConsultarCnpj ref="popupCnpj" />
        </div>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import cs_InputCPF from '@/components/campos/cs_InputCPF.vue';
import cs_InputCnpj from '@/components/campos/cs_InputCnpj.vue';
import cs_InputCelular from '@/components/campos/cs_InputCelular.vue';
import cs_InputTelefone from '@/components/campos/cs_InputTelefone.vue';
import cs_InputCep from '@/components/campos/cs_InputCep.vue';
import cs_SelectTratamento from '@/components/selects/cs_SelectTratamento.vue';
import cs_SelectZona from '@/components/selects/cs_SelectZona.vue';
import PopupConsultarCnpj from '@/components/popup/cs_PopUpRecuperarDados.vue';
import cs_InputNumInteiro from '@/components/campos/cs_InputNumInteiro.vue';

// Variável para armazenar o CEP inicial ou o valor alterado
const cepValue = ref('12345678');

// Função para tratar o evento 'cep-info' e capturar os dados do CEP
const handleCepInfo = (info: any) => {
    console.log('Informações do CEP:', info);
};

// Cria uma referência ao componente popup
const popupCnpj = ref<InstanceType<typeof PopupConsultarCnpj> | null>(null);

// Função para abrir o popup chamando `openDialogFator`
const abrirPopup = () => {
    popupCnpj.value?.openDialogFator();
};
</script>
