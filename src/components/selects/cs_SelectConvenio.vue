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
import { GetListEstaticasBB012 } from '../../services/estaticas/estaticas_bb012';
import type { Csicp_bb01201_con } from '../../types/estaticas/BB/bb012_Estaticas';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const convenio = ref<Csicp_bb01201_con[]>([]);
const internalSelectedConvenio = ref<number | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione o convênio');

const formattedConvenio = computed(() => {
    return [
        { title: '', value: 0 },
        ...convenio.value.map((item) => ({
            title: item.Label,
            value: item.Id
        }))
    ];
});

const fetchConvenio = async () => {
    try {
        const response = await GetListEstaticasBB012();
        if (response.status === 200) {
            convenio.value = response.data.csicp_bb01201_con;
            if (internalSelectedConvenio.value) {
                const selected = convenio.value.find((convenio) => convenio.Id === internalSelectedConvenio.value);
                if (selected) {
                    internalSelectedConvenio.value = selected.Id;
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
    await fetchConvenio();
});

watch(internalSelectedConvenio, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedConvenio.value);
}
</script>
