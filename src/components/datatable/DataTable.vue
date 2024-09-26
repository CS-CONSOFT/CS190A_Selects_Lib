<template>
    <v-card>
        <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Pesquisar" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="filteredItems"
            :search="search"
            :items-per-page="itemsPerPage"
            class="elevation-1"
            :footer-props="{
                'items-per-page-options': [5, 10, 15],
                'items-per-page-text': 'Itens por página'
            }"
        >
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
        </v-data-table>
    </v-card>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
    items: {
        type: Array,
        required: true
    },
    headers: {
        type: Array,
        required: true
    }
});

const search = ref('');
const itemsPerPage = ref(5);

const filteredItems = computed(() => {
    if (!search.value) return props.items;
    return props.items.filter((item) => Object.values(item).some((val) => String(val).toLowerCase().includes(search.value.toLowerCase())));
});

const editItem = (item) => {
    console.log('Edit item:', item);
};

const deleteItem = (item) => {
    console.log('Delete item:', item);
};
</script>

<style scoped>
.v-data-table {
    height: 100%;
}
</style>
