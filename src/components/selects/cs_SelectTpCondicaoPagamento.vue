<template>
    <v-select
        v-model="internalSelectedTipoCondicao"
        :items="tipo"
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

const tipo = ref<{ title: string; value: string }[]>([]);
const internalSelectedTipoCondicao = ref<string | null>(null);
const errors = ref<string[]>([]);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um tipo');

const fetchTpCondiPagamento = async () => {
    try {
        const response = await getEstaticasBB(StaticTypeBB.CSICP_BB008_TIPO);

        if (response.status === 200) {
            const fetchedData = response.data as unknown as { title: string; value: string }[];

            tipo.value = [{ title: '', value: '0' }, ...fetchedData];

            if (internalSelectedTipoCondicao.value) {
                const selected = tipo.value.find((tipo) => tipo.value === internalSelectedTipoCondicao.value);
                if (selected) {
                    internalSelectedTipoCondicao.value = selected.value;
                }
            }
        } else {
            console.error('Erro ao buscar os tipos da condição de pagamento:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os tipos da condição de pagamento:', error);
    }
};

onMounted(async () => {
    await fetchTpCondiPagamento();
});

watch(internalSelectedTipoCondicao, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedTipoCondicao.value);
}

function validate() {
    errors.value = [];
    const valueToValidate = internalSelectedTipoCondicao.value?.toString() || '';

    if (props.rules) {
        for (const rule of props.rules) {
            const result = rule(valueToValidate);
            if (result !== true) {
                errors.value.push(result);
            }
        }
    }
    return errors.value.length === 0;
}

defineExpose({ validate });
</script>
