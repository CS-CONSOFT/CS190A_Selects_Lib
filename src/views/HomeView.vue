<template>
    <cs_SelectConvenios class="mb-5" v-model="modelo" :Prm_isObrigatorio="false" />

    <cs_SelectPaises :Prm_isObrigatorio="false" />
</template>
<script setup lang="ts">
import cs_SelectConvenios from '../components/selects/cs_SelectConvenios.vue';
import cs_SelectPaises from '../components/selects/cs_SelectPaises.vue';

const modelo = '';
</script>
