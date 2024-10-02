<template>
    <!-- Quando a API retornar o total de itens, vai ser exibido a primeira versão -->
    <v-row v-if="totalItems && totalItems > 0" class="d-flex align-center">
        <v-col cols="3" class="d-flex justify-start">
            <p>{{ startItem }} a {{ endItem }} de {{ totalItems }} registros</p>
        </v-col>
        <v-col class="d-flex justify-start" cols="9">
            <v-pagination
                v-model="localCurrentPage"
                :length="totalPages"
                next-icon="mdi-menu-right"
                prev-icon="mdi-menu-left"
                @input="pageChanged"
            ></v-pagination>
        </v-col>
    </v-row>

    <!-- Quando não houver total de itens, vai ser esta segunda versão -->
    <v-row v-else class="d-flex align-center">
        <v-col class="text-center" cols="12">
            <v-pagination
                v-model="localCurrentPage"
                :length="totalPages"
                next-icon="mdi-menu-right"
                prev-icon="mdi-menu-left"
                @input="pageChanged"
            ></v-pagination>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems?: number;
}>();

const emit = defineEmits<{
    (event: 'update:currentPage', value: number): void;
}>();

// Garantir que currentPage está sempre sincronizada com o localCurrentPage
const localCurrentPage = computed({
    get: () => props.currentPage,
    set: (value: number) => emit('update:currentPage', value)
});

// Usar totalItems com verificação de fallback para 0
const startItem = computed(() => (props.currentPage - 1) * props.itemsPerPage + 1);

// Garantir que endItem não exceda totalItems, com fallback para 0
const endItem = computed(() => Math.min(props.currentPage * props.itemsPerPage, props.totalItems || 0));

// Emitir a mudança de página
function pageChanged(page: number) {
    emit('update:currentPage', page);
}
</script>
