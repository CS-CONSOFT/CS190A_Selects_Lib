<template>
    <v-select
        v-model="internalSelectedContatos"
        :items="formattedContatos"
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
import { getListContatosCombo } from '../../services/contas/combos/bb035_Contatos';
import type { Lista_bb035_List } from '../../types/crm/combos/combo_ContatosTypes';

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
const contatos = ref<Lista_bb035_List[]>([]);
const internalSelectedContatos = ref<string | null>(null);
const errors = ref<string[]>([]);

const computedLabel = computed(() => props.Prm_etiqueta || 'Contatos');

const formattedContatos = computed(() => {
    return [
        { title: '', value: null },
        ...contatos.value.map((item) => ({
            title: `${item.csicp_bb035.BB035_PrimeiroNome} ${item.csicp_bb035.BB035_Sobrenome}`,
            value: item.csicp_bb035.Id
        }))
    ];
});

const fetchUsuarios = async () => {
    try {
        const response = await getListContatosCombo(tenant);
        if (response.status === 200) {
            contatos.value = response.data.Lista_bb035_List;
            if (internalSelectedContatos.value) {
                const selected = contatos.value.find((contato) => contato.csicp_bb035.Id === internalSelectedContatos.value);
                if (selected) {
                    internalSelectedContatos.value = selected.csicp_bb035.Id;
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
