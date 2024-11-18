<template>
    <v-select
        v-model="internalSelectedConvenio"
        :items="formattedConvenio"
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
import { getListConvenioCombo } from '../../services/contas/combos/bb060_ComboConvenio';
import type { Convenio_List } from '../../types/crm/combos/combo_ConvenioTypes';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const user = getUserFromLocalStorage();
const tenant = user?.TenantId;
const convenios = ref<Convenio_List[]>([]);
const internalSelectedConvenio = ref<number | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um convênio');

const formattedConvenio = computed(() => {
    return [
        { title: '', value: '' },
        ...convenios.value.map((item) => ({
            title: item.bb060_Descricao,
            value: item.bb060_ConvenioId
        }))
    ];
});

const fetchConvenios = async () => {
    try {
        const response = await getListConvenioCombo(tenant);
        if (response.status === 200) {
            convenios.value = response.data.Convenio_List;
            if (internalSelectedConvenio.value) {
                const selected = convenios.value.find((convenio) => convenio.bb060_ConvenioId === internalSelectedConvenio.value);
                if (selected) {
                    internalSelectedConvenio.value = selected.bb060_ConvenioId;
                }
            }
        } else {
            console.error('Erro ao buscar os convênios:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os convênios:', error);
    }
};

onMounted(async () => {
    await fetchConvenios();
});

watch(internalSelectedConvenio, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedConvenio.value);
}
</script>
