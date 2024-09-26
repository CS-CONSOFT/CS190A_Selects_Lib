<template>
    <v-btn :color="btnColor" :prepend-icon="btnIcon" variant="flat">
        {{ btnLabel }}
    </v-btn>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    IsActive: {
        type: Boolean,
        required: true
    }
});

const btnColor = computed(() => (props.IsActive ? 'error' : 'greensuccess'));
const btnIcon = computed(() => (props.IsActive ? 'mdi-cancel' : 'mdi-check'));
const btnLabel = computed(() => (props.IsActive ? 'Inativar' : 'Ativar'));
</script>
