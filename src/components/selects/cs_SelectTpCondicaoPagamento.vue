<template>
    <v-select
        v-model="internalSelectedTipoCondicao"
        :items="formattedTipo"
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
import { getListEstaticasBB } from '@/services/estaticas/estaticas_bb';
import type { Csicp_bb008_tipo } from '@/types/basico/estaticas/BB/bb_estaticas';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{
    Prm_etiqueta?: string;
    Prm_isObrigatorio: boolean;
    rules?: Array<(v: string) => true | string>;
}>();

const tipo = ref<Csicp_bb008_tipo[]>([]);
const internalSelectedTipoCondicao = ref<string | null>(null);
const errors = ref<string[]>([]);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um tipo');

const formattedTipo = computed(() => {
    return [
        { title: '', value: null },
        ...tipo.value.map((item) => ({
            title: item.Label,
            value: item.Id
        }))
    ];
});

const fetchTpCondiPagamento = async () => {
    try {
        const response = await getListEstaticasBB();
        if (response.status === 200) {
            tipo.value = response.data.csicp_bb008_tipo;
            if (internalSelectedTipoCondicao.value) {
                const selected = tipo.value.find((tipo) => tipo.Id === Number(internalSelectedTipoCondicao.value));
                if (selected) {
                    internalSelectedTipoCondicao.value = selected.Id.toString();
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
    if (props.rules) {
        for (const rule of props.rules) {
            const result = rule(internalSelectedTipoCondicao.value || '');
            if (result !== true) {
                errors.value.push(result);
            }
        }
    }
    return errors.value.length === 0;
}

defineExpose({ validate });
</script>
