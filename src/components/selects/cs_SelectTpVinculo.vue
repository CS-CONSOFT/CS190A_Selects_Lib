<template>
    <v-select
        v-model="internalSelectedVinFormaPagamento"
        :items="vinFormaPagamento"
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

const vinFormaPagamento = ref<{ title: string; value: string }[]>([]);
const internalSelectedVinFormaPagamento = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um tipo de vínculo');

const fetchVinFormaPagamento = async () => {
    try {
        const response = await getEstaticasBB(StaticTypeBB.CSICP_BB026_VIN);
        if (response.status === 200) {
            const fetchedData = response.data as unknown as { title: string; value: string }[];

            vinFormaPagamento.value = [{ title: '', value: '0' }, ...fetchedData];

            if (internalSelectedVinFormaPagamento.value) {
                const selected = vinFormaPagamento.value.find((vinculo) => vinculo.value === internalSelectedVinFormaPagamento.value);
                if (selected) {
                    internalSelectedVinFormaPagamento.value = selected.value;
                }
            }
        } else {
            console.error('Erro ao buscar os vínculos da forma de pagamento:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os vínculos da forma de pagamento:', error);
    }
};

onMounted(async () => {
    await fetchVinFormaPagamento();
});

watch(internalSelectedVinFormaPagamento, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedVinFormaPagamento.value);
}
</script>
