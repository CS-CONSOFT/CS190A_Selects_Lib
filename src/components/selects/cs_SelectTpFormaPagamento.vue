<template>
    <v-select
        v-model="internalSelectedTpFormaPagamento"
        :items="tipoFormaPagamento"
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
import { getEstaticasBB } from '@/services/estaticasNovas/bb_Estaticas';
import { StaticTypeBB } from '@/utils/enums/staticTypeBB';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const tipoFormaPagamento = ref<{ title: string; value: string }[]>([]);
const internalSelectedTpFormaPagamento = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um tipo para a forma de pagamento');

const fetchTipoFormaPagamento = async () => {
    try {
        const response = await getEstaticasBB(StaticTypeBB.CSICP_BB026_TIPO);
        if (response.status === 200) {
            const fetchedData = response.data as unknown as { title: string; value: string }[];

            tipoFormaPagamento.value = [{ title: '', value: '0' }, ...fetchedData];

            if (internalSelectedTpFormaPagamento.value) {
                const selected = tipoFormaPagamento.value.find((tipo) => tipo.value === internalSelectedTpFormaPagamento.value);
                if (selected) {
                    internalSelectedTpFormaPagamento.value = selected.value;
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
