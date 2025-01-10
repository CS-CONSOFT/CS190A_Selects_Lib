<template>
    <v-select
        v-model="internalSelectedFuncao"
        :items="funcoes"
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
import { getUserFromLocalStorage } from '../../utils/getUserStorage';
import { getCombosBB } from '../../services/combos/bb_Combos';
import { ComboTypesBB } from '../../utils/enums/comboTypeBB';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const user = getUserFromLocalStorage();
const tenant = user?.TenantId;
const funcoes = ref<{ title: string; value: string }[]>([]);
const internalSelectedFuncao = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione uma função');

const fetchResponsaveis = async () => {
    try {
        const response = await getCombosBB(tenant, ComboTypesBB.csicp_bb031);
        if (response.status === 200) {
            const fetchedData = response.data as unknown as { title: string; value: string }[];

            funcoes.value = [{ title: '', value: '' }, ...fetchedData];

            if (internalSelectedFuncao.value) {
                const selected = funcoes.value.find((funcao) => funcao.value === internalSelectedFuncao.value);
                if (selected) {
                    internalSelectedFuncao.value = selected.value;
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
