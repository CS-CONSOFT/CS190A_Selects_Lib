<template>
    <v-select
        v-model="internalSelectedVinFormaPagamento"
        :items="formattedVinFormaPagamento"
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
import { ref, computed, defineEmits, onMounted, watch } from 'vue';
import { getListEstaticasBB } from '@/services/estaticas/estaticas_bb';
import type { Csicp_bb026_Vin } from '@/types/basico/estaticas/BB/bb_estaticas';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const vinFormaPagamento = ref<Csicp_bb026_Vin[]>([]);
const internalSelectedVinFormaPagamento = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um tipo de vínculo');

const formattedVinFormaPagamento = computed(() => {
    return vinFormaPagamento.value.map((item) => ({
        title: item.Label,
        value: item.Id
    }));
});

const fetchVinFormaPagamento = async () => {
    try {
        const response = await getListEstaticasBB();
        if (response.status === 200) {
            vinFormaPagamento.value = response.data.csicp_bb026_Vin;
            if (internalSelectedVinFormaPagamento.value) {
                const selected = vinFormaPagamento.value.find((vinculo) => vinculo.Id === Number(internalSelectedVinFormaPagamento.value));
                if (selected) {
                    internalSelectedVinFormaPagamento.value = selected.Id.toString();
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
