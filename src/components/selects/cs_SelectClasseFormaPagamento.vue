<template>
    <v-select
        v-model="internalSelectedClasseFormaPagamento"
        :items="classeFormaPagamento"
        :rules="props.rules"
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

const props = defineProps<{
    Prm_etiqueta?: string;
    Prm_isObrigatorio: boolean;
    rules?: Array<(v: string) => true | string>;
}>();

const classeFormaPagamento = ref<{ title: string; value: string }[]>([]);
const internalSelectedClasseFormaPagamento = ref<string | null>(null);
const errors = ref<string[]>([]);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione uma classe para a forma de pagamento');

const fetchClasseFormaPagamento = async () => {
    try {
        const response = await getEstaticasBB(StaticTypeBB.CSICP_BB026_CLASSE);
        if (response.status === 200) {
            const fetchedData = response.data as unknown as { title: string; value: string }[];

            classeFormaPagamento.value = [{ title: '', value: '0' }, ...fetchedData];

            if (internalSelectedClasseFormaPagamento.value) {
                const selected = classeFormaPagamento.value.find((classe) => classe.value === internalSelectedClasseFormaPagamento.value);
                if (selected) {
                    internalSelectedClasseFormaPagamento.value = selected.value;
                }
            }
        } else {
            console.error('Erro ao buscar as classes de forma de pagamento:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar as classes de forma de pagamento:', error);
    }
};

onMounted(async () => {
    await fetchClasseFormaPagamento();
});

watch(internalSelectedClasseFormaPagamento, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedClasseFormaPagamento.value);
}

function validate() {
    errors.value = [];
    if (props.rules) {
        for (const rule of props.rules) {
            const result = rule(internalSelectedClasseFormaPagamento.value || '');
            if (result !== true) {
                errors.value.push(result);
            }
        }
    }
    return errors.value.length === 0;
}

defineExpose({ validate });
</script>
