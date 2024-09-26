<template>
    <v-container fluid>
        <v-row class="justify-start pt-2">
            <v-col cols="12" md="4">
                <router-link to="/CentroDeCusto" class="no-underline">
                    <v-card class="pa-3 mb-4 card-height" outlined>
                        <v-card-title class="headline">Centro de Custo</v-card-title>
                        <v-card-text> Gerencie seus centros de custo de forma eficiente. </v-card-text>
                    </v-card>
                </router-link>
            </v-col>
            <v-col cols="12" md="4">
                <router-link to="/Contas" class="no-underline">
                    <v-card class="pa-3 mb-4 card-height" outlined>
                        <v-card-title class="headline">Contas</v-card-title>
                        <v-card-text> Gerencie suas contas de forma fácil e rápida. </v-card-text>
                    </v-card>
                </router-link>
            </v-col>
            <v-col cols="12" md="4">
                <router-link to="/Basico" class="no-underline">
                    <v-card class="pa-3 mb-4 card-height" outlined>
                        <v-card-title class="headline">Básico</v-card-title>
                        <v-card-text> Gerencie as configurações básicas da sua aplicação. </v-card-text>
                    </v-card>
                </router-link>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts"></script>

<style scoped>
.v-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}

.v-card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition:
        transform 0.2s,
        box-shadow 0.2s;
}

.v-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.no-underline {
    text-decoration: none;
}

.card-height {
    height: 150px;
}
</style>
