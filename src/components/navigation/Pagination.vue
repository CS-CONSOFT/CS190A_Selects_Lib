<template>
    <!-- Exibição de paginação com itens por página -->
    <v-row v-if="totalItems && totalItems > 0" class="d-flex align-center py-2 px-4">
        <v-col cols="2" class="d-flex justify-center">
            <v-select v-model="localItemsPerPage" label="Itens por página" :items="[5, 10, 15, 25, 50]" hide-details />
        </v-col>
        <v-col class="d-flex justify-center" cols="8">
            <v-pagination
                v-model="localCurrentPage"
                :length="totalPages"
                next-icon="mdi-menu-right"
                prev-icon="mdi-menu-left"
                :total-visible="14"
            />
        </v-col>
        <v-col cols="2" class="d-flex justify-end pr-4">
            <p>{{ startItem }} a {{ endItem }} de {{ totalItems }} registros</p>
        </v-col>
    </v-row>

    <!-- Exibição de paginação sem totalItems -->
    <v-row v-else class="d-flex align-center">
        <v-col cols="8" class="text-center">
            <v-pagination v-model="localCurrentPage" :length="totalPages" next-icon="mdi-menu-right" prev-icon="mdi-menu-left" />
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

// Props recebidas
const props = defineProps({
    currentPage: { type: Number, required: true },
    totalItems: { type: Number, required: true },
    itemsPerPage: { type: Number, required: true }
});

// Emissão de eventos
const emit = defineEmits<{
    (event: 'update:currentPage', value: number): void;
    (event: 'update:itemsPerPage', value: number): void;
}>();

// Reatividade
const localItemsPerPage = ref(props.itemsPerPage);
const localCurrentPage = ref(props.currentPage);

// Cálculo de totalPages
const totalPages = computed(() => {
    // Se totalItems for maior que zero, calcula as páginas
    return props.totalItems > 0 ? Math.max(1, Math.ceil(props.totalItems / localItemsPerPage.value)) : 0;
});

// Atualizar currentPage se totalPages mudar
watch(totalPages, (newTotalPages) => {
    // Se a página atual for maior que o número de páginas disponíveis, ajuste para a última página
    if (localCurrentPage.value > newTotalPages) {
        localCurrentPage.value = newTotalPages || 1;
    }
});

// Atualizar props ao mudar localItemsPerPage ou localCurrentPage
watch(localItemsPerPage, (newItemsPerPage) => {
    emit('update:itemsPerPage', newItemsPerPage);
});

watch(localCurrentPage, (newCurrentPage) => {
    emit('update:currentPage', newCurrentPage);
});

// Calcular itens exibidos
const startItem = computed(() => {
    return props.totalItems > 0 ? (localCurrentPage.value - 1) * localItemsPerPage.value + 1 : 0;
});
const endItem = computed(() => {
    return props.totalItems > 0 ? Math.min(localCurrentPage.value * localItemsPerPage.value, props.totalItems) : 0;
});
</script>
