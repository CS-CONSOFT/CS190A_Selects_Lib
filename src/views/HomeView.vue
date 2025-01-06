<template>
    <div class="mt-5">
        <cs_SelectConvenio v-model="convenio" :Prm_isObrigatorio="true" />
    </div>
    <div class="mt-5">
        <cs_SelectClasse v-model="classe" :Prm_isObrigatorio="true" />
    </div>
    <div class="mt-5">
        <cs_SelectEstadoCivil v-model="estadoCivil" :Prm_isObrigatorio="true" />
    </div>
    <div class="mt-5">
        <cs_SelectGrauEscolaridade v-model="grauEscolaridade" :Prm_isObrigatorio="true" />
    </div>
    <div class="mt-5">
        <cs_SelectGrupo v-model="grupo" :Prm_isObrigatorio="true" />
    </div>
    <div class="mt-5">
        <cs_SelectMRelacionamento v-model="mRelacionamento" :Prm_isObrigatorio="true" />
    </div>
    <div class="mt-5">
        <cs_SelectOcupacao v-model="ocupacao" :Prm_isObrigatorio="true" />
    </div>
    <div class="mt-5"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import cs_SelectConvenio from '../components/selects/cs_SelectConvenio.vue';
import cs_SelectClasse from '../components/selects/cs_SelectClasse.vue';
import cs_SelectEstadoCivil from '../components/selects/cs_SelectEstadoCivil.vue';
import cs_SelectGrauEscolaridade from '../components/selects/cs_SelectGrauEscolaridade.vue';
import cs_SelectGrupo from '../components/selects/cs_SelectGrupo.vue';
import cs_SelectMRelacionamento from '../components/selects/cs_SelectMRelacionamento.vue';
import cs_SelectOcupacao from '../components/selects/cs_SelectOcupacao.vue';

const convenio = ref<string | null>(null);
const classe = ref<string | null>(null);
const estadoCivil = ref<string | null>(null);
const grauEscolaridade = ref<string | null>(null);
const grupo = ref<string | null>(null);
const mRelacionamento = ref<string | null>(null);
const ocupacao = ref<string | null>(null);
</script>
