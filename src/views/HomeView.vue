<template>
    <div class="mt-5">
        <cs_SelectSpedCfop v-model="cfop" :Prm_isObrigatorio="true" />
    </div>
    <div class="mt-5">
        <cs_SelectSpedIcms v-model="cfop" :Prm_isObrigatorio="true" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import cs_SelectSpedCfop from '@/components/selects/cs_SelectSpedCfop.vue';
import cs_SelectSpedIcms from '@/components/selects/cs_SelectSpedIcms.vue';

const cfop = ref<string | null>(null);
</script>
