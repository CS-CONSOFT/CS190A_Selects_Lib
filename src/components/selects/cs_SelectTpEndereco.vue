<template>
    <v-select
        v-model="internalSelectedTpEndereco"
        :items="formattedTpEndereco"
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
import { getListEstaticasBB012 } from '@/services/estaticas/bb012_Estaticas';
import type { Csicp_bb012j_TpEnd } from '../../types/estaticas/BB/bb012_Estaticas';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{
    Prm_etiqueta?: string;
    Prm_isObrigatorio: boolean;
    rules?: Array<(v: string) => true | string>;
}>();

const tipoEndereco = ref<Csicp_bb012j_TpEnd[]>([]);
const internalSelectedTpEndereco = ref<string | null>(null);
const errors = ref<string[]>([]);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um tipo de endereço');

const formattedTpEndereco = computed(() => {
    return [
        { title: '', value: null },
        ...tipoEndereco.value.map((item) => ({
            title: item.Label,
            value: item.Id
        }))
    ];
});

const fetchTipoEspecie = async () => {
    try {
        const response = await getListEstaticasBB012();
        if (response.status === 200) {
            tipoEndereco.value = response.data.csicp_bb012j_TpEnd;
            if (internalSelectedTpEndereco.value) {
                const selected = tipoEndereco.value.find((endereco) => endereco.Id === Number(internalSelectedTpEndereco.value));
                if (selected) {
                    internalSelectedTpEndereco.value = selected.Id.toString();
                }
            }
        } else {
            console.error('Erro ao buscar o tipo endereço:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar o tipo endereço:', error);
    }
};

onMounted(async () => {
    await fetchTipoEspecie();
});

watch(internalSelectedTpEndereco, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedTpEndereco.value);
}

function validate() {
    errors.value = [];
    if (props.rules) {
        for (const rule of props.rules) {
            const result = rule(internalSelectedTpEndereco.value || '');
            if (result !== true) {
                errors.value.push(result);
            }
        }
    }
    return errors.value.length === 0;
}

defineExpose({ validate });
</script>
