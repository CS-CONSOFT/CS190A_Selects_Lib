<template>
    <v-select
        v-model="internalSelectedBanco"
        :items="filteredBancos"
        item-value="value"
        item-text="title"
        variant="solo-filled"
        hide-details
        @change="emitSelection"
        :menu-props="{ offsetY: true, width: '40%' }"
        content-class="custom-select-menu"
    >
        <template v-slot:prepend-item>
            <v-row class="sticky-search-field pa-0">
                <v-text-field
                    v-model="search"
                    prepend-inner-icon="mdi-magnify"
                    label="Pesquisar"
                    single-line
                    variant="solo-filled"
                    hide-details
                    clearable
                />
            </v-row>

            <v-divider class="mt-2"></v-divider>
        </template>

        <template v-slot:label>
            <span class="d-flex align-center" style="font-size: 12px; font-weight: 500; padding-bottom: 0.1em; color: #808080">
                {{ computedLabel }}<span v-if="props.Prm_isObrigatorio" class="text-error">*</span>
            </span>
        </template>
    </v-select>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { GetListEstaticasBB } from '../../services/estaticas/estaticas_bb';
import type { Csicp_bb006_Banco } from '../../types/basico/estaticas/BB/bb_estaticas';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const bancos = ref<Csicp_bb006_Banco[]>([]);
const internalSelectedBanco = ref<number | null>(null);
const search = ref<string>('');

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um banco');

const filteredBancos = computed(() => {
    if (!search.value) {
        return [
            { title: '', value: 0 },
            ...bancos.value.map((item) => ({
                title: item.NomedoBanco,
                value: item.Id
            }))
        ];
    }

    const searchText = search.value.toLowerCase();
    return bancos.value
        .filter((item) => item.NomedoBanco.toLowerCase().includes(searchText))
        .map((item) => ({
            title: item.NomedoBanco,
            value: item.Id
        }));
});

const fetchBancos = async () => {
    try {
        const response = await GetListEstaticasBB();
        if (response.status === 200) {
            bancos.value = response.data.csicp_bb006_Banco;
            if (internalSelectedBanco.value) {
                const selected = bancos.value.find((pais) => pais.Id === internalSelectedBanco.value);
                if (selected) {
                    internalSelectedBanco.value = selected.Id;
                }
            }
        } else {
            console.error('Erro ao buscar os bancos:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os bancos:', error);
    }
};

onMounted(async () => {
    await fetchBancos();
});

watch(internalSelectedBanco, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedBanco.value);
}
</script>
