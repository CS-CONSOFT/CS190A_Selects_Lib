<template>
    <v-select
        v-model="selectedEstab"
        :items="getListEstabelecimento()"
        item-value="value"
        item-text="title"
        variant="solo-filled"
        hide-details
    >
        <template v-slot:label>
            <span class="d-flex align-center" style="font-size: 12px; font-weight: 500; padding-bottom: 0.1em; color: #808080">
                <span class="text-error">Selecionar</span>
            </span>
        </template>
    </v-select>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useAuthStore } from '../../stores/auth';
import type { IEstabelecimentoListItem } from '../../types/login/Login';
import { StorageTypesKey } from '../../types/StorageTypes';
const selectedEstab = ref('');
const currentUser = useAuthStore().user;

function getListEstabelecimento() {
    const userEstabs = JSON.parse(localStorage.getItem(StorageTypesKey.USER_ESTABS) || '') as IEstabelecimentoListItem[];
    const formattedEstabs = userEstabs.map((item) => ({
        title: item.NomeEstabelecimento,
        value: item.EstabelecimentoId
    }));
    return formattedEstabs;
}

watch(selectedEstab, (currentEstabIdSelected) => {
    if (currentEstabIdSelected !== currentUser?.EstabelecimentoId) {
        currentUser!.EstabelecimentoId = currentEstabIdSelected;
        const estabName = getListEstabelecimento().find((item) => item.value === currentEstabIdSelected)?.title;
        currentUser!.NomeEstabelecimento = estabName!;

        const authStore = useAuthStore();
        authStore.setUser(currentUser!);
    }
});

onMounted(() => {
    selectedEstab.value = currentUser?.EstabelecimentoId || '';
});
</script>
