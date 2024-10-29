<template>
    <v-dialog v-model="dialog" max-width="700">
        <template v-slot:activator="{ props: activatorProps }">
            <v-icon v-if="props.update" v-bind="activatorProps" class="v-btn-icon">mdi-pencil</v-icon>

            <v-btn v-else prepend-icon="mdi-plus" v-bind="activatorProps" class="bg-primary mr-4" :text="props.title"
                variant="flat" />
        </template>

        <v-card>
            <v-card-title>
                <span>{{ title }}</span>
            </v-card-title>
            <v-card-title>
                <slot name="content"></slot>
            </v-card-title>
            <v-card-actions>
                <v-btn color="error" variant="flat" @click="dialog = false">Fechar</v-btn>
                <slot name="actions"></slot>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

const dialog = ref(false);


const props = defineProps({
    dialog: Boolean,
    title: String,
    update: Boolean
});
</script>
