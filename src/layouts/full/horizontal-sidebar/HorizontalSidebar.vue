<template>
    <template v-if="mdAndUp">
        <div class="horizontalMenu bg-muted position-relative">
            <div :class="customizer.boxed ? 'maxWidth' : 'px-6'">
                <ul class="gap-1 horizontal-navbar mx-lg-0 mx-3">
                    <!-- Menu Loop -->
                    <li v-for="(item, i) in sidebarMenu" :key="i" class="navItem">
                        <!-- If Has Child -->
                        <NavCollapse v-if="item.children" :item="item" :level="0" />
                        <!-- Single Item -->
                        <NavItem v-else-if="!item.header" :item="item" />
                        <!-- Header Item -->
                        <div v-else class="navItemHeader">{{ $t(item.header) }}</div>
                    </li>
                </ul>
            </div>
        </div>
    </template>
    <div v-else class="mobile-menu">
        <VerticalSidebar />
    </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { useDisplay } from 'vuetify';
import { useCustomizerStore } from '@/stores/customizer';
import HorizontalItems from './horizontalItems';
import NavItem from './NavItem/Index.vue';
import NavCollapse from './NavCollapse/Index.vue';
import VerticalSidebar from '../vertical-sidebar/VerticalSidebar.vue';

const customizer = useCustomizerStore();
const sidebarMenu = shallowRef(HorizontalItems);
const { mdAndUp } = useDisplay();
</script>
