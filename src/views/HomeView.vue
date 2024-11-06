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
            <cs_InputTelefone :Prm_limpavel="false" :Prm_isObrigatorio="true" />
        </div>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import cs_InputCPF from '@/components/campos/cs_InputCPF.vue';
import cs_InputCnpj from '@/components/campos/cs_InputCnpj.vue';
import cs_InputCelular from '@/components/campos/cs_InputCelular.vue';
import cs_InputTelefone from '@/components/campos/cs_InputTelefone.vue';
</script>
