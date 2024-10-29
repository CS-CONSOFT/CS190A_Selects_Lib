<template>
    <v-select
        v-model="internalSelectedEspecie"
        :items="formattedEspecie"
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
import { getUserFromLocalStorage } from '../../utils/getUserStorage';
import { GetListEspecieCombo } from '../../services/financeiro/combos/ff003_comboEspecie';
import type { Csicp_ff003_List } from '../../types/financeiro/especie/ff003_especie';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{
    Prm_etiqueta?: string;
    Prm_isObrigatorio: boolean;
    rules?: Array<(v: string) => true | string>;
}>();

const user = getUserFromLocalStorage();
const tenant = user?.TenantId;
const especie = ref<Csicp_ff003_List[]>([]);
const internalSelectedEspecie = ref<string | null>(null);
const errors = ref<string[]>([]);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione uma espécie');

const formattedEspecie = computed(() => {
    return [
        { title: '', value: null },
        ...especie.value.map((item: { FF003_Descricao: any; Id: any }) => ({
            title: item.FF003_Descricao,
            value: item.Id
        }))
    ];
});

const fetchTipoEspecie = async () => {
    try {
        const response = await GetListEspecieCombo(tenant);
        if (response.status === 200) {
            especie.value = response.data.csicp_ff003_List;
            if (internalSelectedEspecie.value) {
                const selected = especie.value.find((especie: { Id: string | null }) => especie.Id === internalSelectedEspecie.value);
                if (selected) {
                    internalSelectedEspecie.value = selected.Id;
                }
            }
        } else {
            console.error('Erro ao buscar espécie:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar espécie:', error);
    }
};

onMounted(async () => {
    await fetchTipoEspecie();
});

watch(internalSelectedEspecie, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedEspecie.value);
}

function validate() {
    errors.value = [];
    if (props.rules) {
        for (const rule of props.rules) {
            const result = rule(internalSelectedEspecie.value || '');
            if (result !== true) {
                errors.value.push(result);
            }
        }
    }
    return errors.value.length === 0;
}

defineExpose({ validate });
</script>
