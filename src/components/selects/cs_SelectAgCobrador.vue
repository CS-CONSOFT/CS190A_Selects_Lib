<template>
    <v-select
        v-model="internalSelectedAgente"
        :items="formattedAgente"
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
import { GetListAgenteCobradorCombo } from '../../services/basico/combos/bb006_comboAgenteCobrador';
import type { AgenteCobradorCombo, Lista_bb006 } from '../../services/basico/combos/bb006_comboAgenteCobrador';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const user = getUserFromLocalStorage();
const tenant = user?.TenantId;
const agente = ref<Lista_bb006[]>([]);
const internalSelectedAgente = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um agente cobrador');

const formattedAgente = computed(() => {
    return [
        { title: '', value: '' },
        ...agente.value
            .filter((item) => item.BB006_NomeReduzido)
            .map((item) => ({
                title: item.BB006_NomeReduzido,
                value: item.ID
            }))
    ];
});

const fetchAgenteCobrador = async () => {
    try {
        const response = await GetListAgenteCobradorCombo(tenant);
        if (response.status === 200) {
            agente.value = response.data.Lista_bb006;
            if (internalSelectedAgente.value) {
                const selected = agente.value.find((agente) => agente.ID === internalSelectedAgente.value);
                if (selected) {
                    internalSelectedAgente.value = selected.ID;
                }
            }
        } else {
            console.error('Erro ao buscar o agente cobrador:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar o agente cobrador:', error);
    }
};

onMounted(async () => {
    await fetchAgenteCobrador();
});

watch(internalSelectedAgente, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedAgente.value);
}
</script>
