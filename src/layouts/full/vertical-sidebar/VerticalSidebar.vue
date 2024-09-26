<template>
    <v-navigation-drawer
        left
        v-model="customizer.Sidebar_drawer"
        elevation="0"
        rail-width="75"
        app
        class="leftSidebar"
        :rail="customizer.mini_sidebar"
        expand-on-hover
        width="300"
    >
        <div class="sidebar-wrapper">
            <div class="sidebar_profile border-bottom">
                <v-list class="bg-muted">
                    <v-list-item class="pa-4 ml-1">
                        <v-list-item-title class="text-h6">{{ authStore.user?.NomeUsuario }}</v-list-item-title>
                        <v-list-item-subtitle class="text-subtitle-1">{{ authStore.user?.NomeEstabelecimento }}</v-list-item-subtitle>
                        <template v-slot:prepend class="me-0">
                            <v-avatar size="45" class="me-0">
                                <img src="https://cdn.vuetifyjs.com/images/john.jpg" width="50" />
                            </v-avatar>
                        </template>
                    </v-list-item>
                </v-list>
            </div>
            <perfect-scrollbar class="scrollnavbar">
                <v-list class="list-personalizada py-5 px-4 bg-muted">
                    <!---Menu Loop -->
                    <template v-for="(item, i) in sidebarMenu">
                        <!---Item Sub Header -->
                        <NavGroup :item="item" v-if="item.header" :key="item.title" />
                        <!---If Has Child -->
                        <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
                        <!---Single Item-->
                        <NavItem :item="item" v-else class="leftPadding" />
                        <!---End Single Item-->
                    </template>
                </v-list>
            </perfect-scrollbar>
        </div>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';
import sidebarItems from './sidebarItem';

import NavGroup from './NavGroup/index.vue';
import NavItem from './NavItem/index.vue';
import NavCollapse from './NavCollapse/NavCollapse.vue';
import Logo from '../logo/Logo.vue';
import { useAuthStore } from '@/stores/auth';

const customizer = useCustomizerStore();
const sidebarMenu = shallowRef(sidebarItems);
const authStore = useAuthStore();
</script>

<style scoped>
.leftSidebar {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.sidebar-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.scrollnavbar {
    flex-grow: 1;
    overflow-y: auto;
}

.list-personalizada {
    flex-grow: 1;
    overflow-y: auto;
    height: 100%;
}
</style>
