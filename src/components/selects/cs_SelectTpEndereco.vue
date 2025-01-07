<template>
    <v-select
        v-model="internalSelectedTpEndereco"
        :items="tipoEndereco"
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
import { getEstaticasBB012 } from '../../services/estaticas/bb012_Estaticas';
import { StaticTypesBB012 } from '../../utils/enums/staticTypesBB012';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{
    Prm_etiqueta?: string;
    Prm_isObrigatorio: boolean;
    rules?: Array<(v: string) => true | string>;
}>();

const tipoEndereco = ref<{ title: string; value: string }[]>([]);
const internalSelectedTpEndereco = ref<string | null>(null);
const errors = ref<string[]>([]);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um tipo de endereço');

const fetchTipoEndereco = async () => {
    try {
        const response = await getEstaticasBB012(StaticTypesBB012.CSICP_BB012J_TPEND);
        if (response.status === 200) {
            const fetchedData = response.data as unknown as { title: string; value: string }[];

            tipoEndereco.value = [{ title: '', value: '0' }, ...fetchedData];

            if (internalSelectedTpEndereco.value) {
                const selected = tipoEndereco.value.find((endereco) => endereco.value === internalSelectedTpEndereco.value);
                if (selected) {
                    internalSelectedTpEndereco.value = selected.value;
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
    await fetchTipoEndereco();
});

watch(internalSelectedTpEndereco, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedTpEndereco.value);
}

function validate() {
    errors.value = [];
    const valueToValidate = internalSelectedTpEndereco.value?.toString() || '';

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
