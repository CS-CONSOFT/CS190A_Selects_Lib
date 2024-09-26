<template>
    <v-app-bar elevation="10" :priority="priority" height="64" color="" id="top">
        <div class="d-sm-flex d-none">
            <Logo />
        </div>
        <div class="d-sm-none d-flex mr-2">
            <v-icon icon="mdi-menu" size="25"></v-icon>
        </div>
        <v-btn class="hidden-md-and-down" icon color="" variant="text" @click.stop="customizer.SET_SIDEBAR_DRAWER()">
            <v-icon icon="mdi-menu" size="25"></v-icon>
        </v-btn>
        <v-btn class="hidden-lg-and-up" icon variant="text" @click.stop="customizer.SET_SIDEBAR_DRAWER()" size="small">
            <v-icon icon="mdi-menu" size="25"></v-icon>
        </v-btn>

        <v-spacer />

        <div class="ml-2">
            <ProfileDD />
        </div>
    </v-app-bar>

    <v-navigation-drawer v-model="appsdrawer" location="right" temporary>
        <RightMobileSidebar />
    </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useCustomizerStore } from '../../../stores/customizer';
import { useEcomStore } from '@/stores/apps/eCommerce';
import ProfileDD from './ProfileDD.vue';

import Logo from '../logo/Logo.vue';
import RightMobileSidebar from './RightMobileSidebar.vue';

const customizer = useCustomizerStore();
const showSearch = ref(false);
const appsdrawer = ref(false);
const priority = ref(customizer.setHorizontalLayout ? 0 : 0);

function searchbox() {
    showSearch.value = !showSearch.value;
}

watch(priority, (newPriority) => {
    priority.value = newPriority;
});

// count items
const store = useEcomStore();
const getCart = computed(() => {
    return store.cart;
});
</script>
