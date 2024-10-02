<template>
    <v-select
        v-model="internalSelectedAPIBanco"
        :items="formattedAPIBancos"
        item-value="value"
        item-text="title"
        variant="solo-filled"
        hide-details
        @change="emitSelection"
        :menu-props="{ offsetY: true, width: '40%' }"
        content-class="custom-select-menu"
    >
        <template v-slot:label>
            <span class="d-flex align-center" style="font-size: 12px; font-weight: 500; padding-bottom: 0.1em; color: #808080">
                {{ computedLabel }}<span v-if="props.Prm_isObrigatorio" class="text-error">*</span>
            </span>
        </template>
    </v-select>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { getListEstaticasFF } from '../../services/estaticas/estaticas_ff';
import type { Csicp_ff102_API_Banco_List } from '../../types/basico/estaticas/FF/ff_estaticas';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const apis = ref<Csicp_ff102_API_Banco_List[]>([]);
const internalSelectedAPIBanco = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione a API Banco');

const formattedAPIBancos = computed(() => {
    return apis.value.map((item) => ({
        title: item.Label,
        value: item.Id
    }));
});

const fetchAPIBancos = async () => {
    try {
        const response = await getListEstaticasFF();
        if (response.status === 200) {
            apis.value = response.data.csicp_ff102_API_Banco_List;
            if (internalSelectedAPIBanco.value) {
                const selected = apis.value.find((pais) => pais.Id === Number(internalSelectedAPIBanco.value));
                if (selected) {
                    internalSelectedAPIBanco.value = selected.Id.toString();
                }
            }
        } else {
            console.error('Erro ao buscar as APIs dos Bancos:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar as APIs dos Bancos:', error);
    }
};
onMounted(async () => {
    await fetchAPIBancos();
});

watch(internalSelectedAPIBanco, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedAPIBanco.value);
}
</script>
