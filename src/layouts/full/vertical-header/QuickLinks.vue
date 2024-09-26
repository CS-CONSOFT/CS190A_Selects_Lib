<template>
    <div>
        <!-- ---------------------------------------------- -->
        <!-- language DD -->
        <!-- ---------------------------------------------- -->
        <div v-for="(item, i) in quickLinks" :key="i" class="py-2">
            <router-link :to="item.href" class="text-decoration-none text-hover-primary font-weight-semibold text-subtitle-1">
                {{ item.title }}
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const quickLinks = ref([
    { title: 'Home', href: '/' },
    { title: 'Profile', href: '/profile' },
    { title: 'Settings', href: '/settings' }
]);
</script>
