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
import { GetListConvenioMasterCombo } from '../../services/basico/combos/bb067_comboConvenioMaster';
import type { Csicp_bb067 } from '../../services/basico/combos/bb067_comboConvenioMaster';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const user = getUserFromLocalStorage();
const tenant = user?.TenantId;
const convenio = ref<Csicp_bb067[]>([]);
const internalSelectedConvenio = ref<number | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um convênio master');

const formattedConvenio = computed(() => {
    return [
        { title: '', value: '' },
        ...convenio.value.map((item) => ({
            title: item.bb067_Descricao,
            value: item.bb067_Id
        }))
    ];
});

const fetchConvenioMaster = async () => {
    try {
        const response = await GetListConvenioMasterCombo(tenant);
        if (response.status === 200) {
            convenio.value = response.data.ConvenioMaster;
            console.log(response);
            if (internalSelectedConvenio.value) {
                const selected = convenio.value.find((convenio) => convenio.bb067_Id === internalSelectedConvenio.value);
                if (selected) {
                    internalSelectedConvenio.value = selected.bb067_Id;
                }
            }
        } else {
            console.error('Erro ao buscar os convênios master:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os convênios master:', error);
    }
};

onMounted(async () => {
    await fetchConvenioMaster();
});

watch(internalSelectedConvenio, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedConvenio.value);
}
</script>
