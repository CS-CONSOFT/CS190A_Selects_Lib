<template>
    <v-select
        v-model="internalSelectedContatos"
        :items="contatos"
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
import { getCombosBB } from '../../services/combos/bb_Combos';
import { ComboTypesBB } from '../../utils/enums/comboTypeBB';

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
const contatos = ref<{ title: string; value: string }[]>([]);
const internalSelectedContatos = ref<string | null>(null);
const errors = ref<string[]>([]);

const computedLabel = computed(() => props.Prm_etiqueta || 'Contatos');

const fetchUsuarios = async () => {
    try {
        const response = await getCombosBB(tenant, ComboTypesBB.csicp_bb035);
        if (response.status === 200) {
            const fetchedData = response.data as unknown as { title: string; value: string }[];

            contatos.value = [{ title: '', value: '' }, ...fetchedData];

            if (internalSelectedContatos.value) {
                const selected = contatos.value.find((contato) => contato.value === internalSelectedContatos.value);
                if (selected) {
                    internalSelectedContatos.value = selected.value;
                }
            }
        } else {
            console.error('Erro ao buscar os contatos:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os contatos:', error);
    }
};

onMounted(async () => {
    await fetchUsuarios();
});

watch(internalSelectedContatos, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedContatos.value);
}

function validate() {
    errors.value = [];
    if (props.rules) {
        for (const rule of props.rules) {
            const result = rule(internalSelectedContatos.value || '');
            if (result !== true) {
                errors.value.push(result);
            }
        }
    }
    return errors.value.length === 0;
}

defineExpose({ validate });
</script>
