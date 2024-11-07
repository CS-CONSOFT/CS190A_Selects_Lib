<template>
    <v-select
        v-model="internalSelectedTpAdministradora"
        :items="formattedTpAdministradoras"
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
import { GetListEstaticasBB } from '../../services/estaticas/estaticas_bb';
import type { Csicp_bb019_Tipo } from '../../types/basico/estaticas/BB/bb_estaticas';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const tipoAdministradoras = ref<Csicp_bb019_Tipo[]>([]);
const internalSelectedTpAdministradora = ref<number | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um tipo de administradora');

const formattedTpAdministradoras = computed(() => {
    return [
        { title: '', value: 0 },
        ...tipoAdministradoras.value.map((item) => ({
            title: item.Label,
            value: item.Id
        }))
    ];
});

const fetchTipoAdministradoras = async () => {
    try {
        const response = await GetListEstaticasBB();
        if (response.status === 200) {
            tipoAdministradoras.value = response.data.csicp_bb019_Tipo;
            if (internalSelectedTpAdministradora.value) {
                const selected = tipoAdministradoras.value.find(
                    (administradora) => administradora.Id === internalSelectedTpAdministradora.value
                );
                if (selected) {
                    internalSelectedTpAdministradora.value = selected.Id;
                }
            }
        } else {
            console.error('Erro ao buscar os tipos de administradoras:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os tipos de administradoras:', error);
    }
};

onMounted(async () => {
    await fetchTipoAdministradoras();
});

watch(internalSelectedTpAdministradora, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedTpAdministradora.value);
}
</script>
