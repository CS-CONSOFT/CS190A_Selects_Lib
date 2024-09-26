<template>
    <v-btn icon flat color="lightprimary">
        <v-icon> {{ btnIcon }}</v-icon>
    </v-btn>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    IsList: {
        type: Boolean,
        required: true
    }
});

const btnIcon = computed(() => (props.IsList ? 'mdi-view-grid' : 'mdi-view-list'));
</script>
