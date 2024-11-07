<template>
    <v-select
        v-model="internalSelectedAtividade"
        :items="formattedAtividade"
        item-value="value"
        :rules="props.rules"
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
import { getListAtividade } from '../../services/basico/combos/bb011_comboAtividade';
import type { Csicp_bb011 } from '../../types/basico/atividade/bb011_atividade';

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
const atividade = ref<Csicp_bb011[]>([]);
const internalSelectedAtividade = ref<string | null>(null);
const errors = ref<string[]>([]);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione uma atividade');

const formattedAtividade = computed(() => {
    return [
        { title: '', value: '' },
        ...atividade.value.map((item) => ({
            title: item.BB011_Atividade,
            value: item.ID
        }))
    ];
});

const fetchAtividade = async () => {
    try {
        const response = await getListAtividade(tenant);
        if (response.status === 200) {
            atividade.value = response.data.csicp_bb011;
            if (internalSelectedAtividade.value) {
                const selected = atividade.value.find((atividade) => atividade.ID === internalSelectedAtividade.value);
                if (selected) {
                    internalSelectedAtividade.value = selected.ID;
                }
            }
        } else {
            console.error('Erro ao buscar as atividades', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar as atividades:', error);
    }
};

onMounted(async () => {
    getUserFromLocalStorage();
    await fetchAtividade();
});

watch(internalSelectedAtividade, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedAtividade.value);
}

function validate() {
    errors.value = [];
    if (props.rules) {
        for (const rule of props.rules) {
            const result = rule(internalSelectedAtividade.value || '');
            if (result !== true) {
                errors.value.push(result);
            }
        }
    }
    return errors.value.length === 0;
}

defineExpose({ validate });
</script>
