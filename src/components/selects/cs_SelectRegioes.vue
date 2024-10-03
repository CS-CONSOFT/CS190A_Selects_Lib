<template>
    <v-select
        v-model="internalSelectedRegiao"
        :items="formattedRegioes"
        item-value="value"
        item-text="title"
        variant="solo-filled"
        hide-details
        @change="emitSelection"
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
import { useAuthStore } from '../../stores/auth';
import { getListaRegioesCombo } from '../../services/enderecamento/combos/aa026_comboRegioes';
import type { Csicp_aa026 } from '../../types/enderecamento/combos/Combo_UnFederativaTypes';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const authStore = useAuthStore();
const tenant = authStore.user?.TenantId;
const regioes = ref<Csicp_aa026[]>([]);
const internalSelectedRegiao = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione uma região');

const formattedRegioes = computed(() => {
    return regioes.value.map((item) => ({
        title: item.AA026_Descricao,
        value: item.Id
    }));
});

const fetchRegioes = async () => {
    try {
        const response = await getListaRegioesCombo(tenant);
        if (response.status === 200) {
            regioes.value = response.data.csicp_aa026;
            if (internalSelectedRegiao.value) {
                const selected = regioes.value.find((regiao) => regiao.Id === internalSelectedRegiao.value);
                if (selected) {
                    internalSelectedRegiao.value = selected.Id;
                }
            }
        } else {
            console.error('Erro ao buscar as regiões:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar as regiões:', error);
    }
};

onMounted(async () => {
    await fetchRegioes();
});

watch(internalSelectedRegiao, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedRegiao.value);
}
</script>
