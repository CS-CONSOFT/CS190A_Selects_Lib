<template>
    <v-select
        v-model="internalSelectedClasseFormaPagamento"
        :items="formattedClasseFormaPagamento"
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
import { getListEstaticasBB } from '../../services/estaticas/estaticas_bb';
import type { Csicp_bb026_Classe } from '../../types/basico/estaticas/BB/bb_estaticas';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{
    Prm_etiqueta?: string;
    Prm_isObrigatorio: boolean;
    rules?: Array<(v: string) => true | string>;
}>();

const classeFormaPagamento = ref<Csicp_bb026_Classe[]>([]);
const internalSelectedClasseFormaPagamento = ref<string | null>(null);
const errors = ref<string[]>([]);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione uma classe para a forma de pagamento');

const formattedClasseFormaPagamento = computed(() => {
    return [
        { title: '', value: null },
        ...classeFormaPagamento.value.map((item) => ({
            title: item.Label,
            value: item.Id
        }))
    ];
});

const fetchClasseFormaPagamento = async () => {
    try {
        const response = await getListEstaticasBB();
        if (response.status === 200) {
            classeFormaPagamento.value = response.data.csicp_bb026_Classe;
            if (internalSelectedClasseFormaPagamento.value) {
                const selected = classeFormaPagamento.value.find(
                    (classe) => classe.Id === Number(internalSelectedClasseFormaPagamento.value)
                );
                if (selected) {
                    internalSelectedClasseFormaPagamento.value = selected.Id.toString();
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
