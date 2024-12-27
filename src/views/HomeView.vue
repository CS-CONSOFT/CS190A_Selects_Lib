<template>
    <cs_InputNumInteiro Prm_etiqueta="Código" :Prm_limpavel="false" :Prm_isObrigatorio="true" />

    <cs_InputCep :initialCep="cep" :readonly="false" :Prm_isObrigatorio="false" @cep-info="handleCepInfo" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import cs_InputNumInteiro from '../components/campos/cs_InputNumInteiro.vue';
import cs_InputCep from '../components/campos/cs_InputCep.vue';

const handleCepInfo = (info: any) => {
    console.log('CEP info:', info);
};

const cep = ref<string | null>(null);
</script>
