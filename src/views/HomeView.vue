<template>
    <cs_InputNumInteiro Prm_etiqueta="Código" :Prm_limpavel="false" :Prm_isObrigatorio="true" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import cs_InputNumInteiro from '../components/campos/cs_InputNumInteiro.vue';
</script>
