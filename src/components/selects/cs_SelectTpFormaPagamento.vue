<template>
    <v-select
        v-model="internalSelectedTpFormaPagamento"
        :items="formattedTpFormaPagamento"
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
import { GetListEstaticasBB } from '../../services/estaticas/estaticas_bb';
import type { Csicp_bb026_Tipo } from '../../types/basico/estaticas/BB/bb_estaticas';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const tipoFormaPagamento = ref<Csicp_bb026_Tipo[]>([]);
const internalSelectedTpFormaPagamento = ref<number | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um tipo para a forma de pagamento');

const formattedTpFormaPagamento = computed(() => {
    return [
        { title: '', value: 0 },
        ...tipoFormaPagamento.value.map((item) => ({
            title: item.Label,
            value: item.Id
        }))
    ];
});

const fetchTipoFormaPagamento = async () => {
    try {
        const response = await GetListEstaticasBB();
        if (response.status === 200) {
            tipoFormaPagamento.value = response.data.csicp_bb026_Tipo;
            if (internalSelectedTpFormaPagamento.value) {
                const selected = tipoFormaPagamento.value.find((tipo) => tipo.Id === internalSelectedTpFormaPagamento.value);
                if (selected) {
                    internalSelectedTpFormaPagamento.value = selected.Id;
                }
            }
        } else {
            console.error('Erro ao buscar os tipos de forma de pagamento:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os tipos de forma de pagamento:', error);
    }
};

onMounted(async () => {
    await fetchTipoFormaPagamento();
});

watch(internalSelectedTpFormaPagamento, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedTpFormaPagamento.value);
}
</script>
