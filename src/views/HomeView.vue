<template>
    <cs_SelectConvenios class="mb-5" :Prm_isObrigatorio="false" />

    <cs_SelectPaises class="mb-5" :Prm_isObrigatorio="false" />

    <cs_SelectVencimento class="mb-5" v-model="modelo" :Prm_isObrigatorio="false" />

    {{ modelo }}
</template>
<script setup lang="ts">
import cs_SelectConvenios from '../components/selects/cs_SelectConvenios.vue';
import cs_SelectPaises from '../components/selects/cs_SelectPaises.vue';
import cs_SelectVencimento from '../components/selects/cs_SelectVencimento.vue';

const modelo = '';
</script>
