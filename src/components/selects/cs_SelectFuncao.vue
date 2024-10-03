<template>
    <v-select
        v-model="internalSelectedFuncao"
        :items="formattedFuncao"
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
import { GetListFuncoesCombo } from '../../services/basico/combos/bb031_comboFuncoes';
import type { Lista_bb031 } from '../../types/basico/funcoes/bb031_funcoes';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const authStore = useAuthStore();
const tenant = authStore.user?.TenantId;
const funcoes = ref<Lista_bb031[]>([]);
const internalSelectedFuncao = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione uma função');

const formattedFuncao = computed(() => {
    return funcoes.value.map((item) => ({
        title: item.csicp_bb031.BB031_Descricao,
        value: item.csicp_bb031.ID
    }));
});

const fetchResponsaveis = async () => {
    try {
        const response = await GetListFuncoesCombo(tenant);
        if (response.status === 200) {
            funcoes.value = response.data.Lista_bb031;
            if (internalSelectedFuncao.value) {
                const selected = funcoes.value.find((funcao) => funcao.csicp_bb031.ID === internalSelectedFuncao.value);
                if (selected) {
                    internalSelectedFuncao.value = selected.csicp_bb031.ID;
                }
            }
        } else {
            console.error('Erro ao buscar as funções:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar as funções:', error);
    }
};

onMounted(async () => {
    await fetchResponsaveis();
});

watch(internalSelectedFuncao, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedFuncao.value);
}
</script>
