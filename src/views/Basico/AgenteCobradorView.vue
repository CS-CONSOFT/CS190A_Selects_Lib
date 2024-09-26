<template>
    <v-container fluid>
        <v-card flat class=""> Pesquisa </v-card>
    </v-container>
</template>
<script setup lang="ts">
// Import de bibliotecas e etc...
import { ref, onMounted, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
// Import de API's
import { GetAgenteCobradorCompleto } from '@/services/basico/bb006_agentecobrador';
// Import de Types
import type { ApiResponse } from '@/types/crm/contas';
import type { AxiosResponse } from 'axios';
</script>
