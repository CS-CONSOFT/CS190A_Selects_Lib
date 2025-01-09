<template>
    <v-select
        v-model="internalSelectedTpAdministradora"
        :items="tipoAdministradoras"
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
import { getEstaticasBB } from '../../services/estaticas/bb_Estaticas';
import { StaticTypeBB } from '../../utils/enums/staticTypeBB';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const tipoAdministradoras = ref<{ title: string; value: number }[]>([]);
const internalSelectedTpAdministradora = ref<number | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um tipo de administradora');

const fetchTipoAdministradoras = async () => {
    try {
        const response = await getEstaticasBB(StaticTypeBB.CSICP_BB019_TIPO);
        if (response.status === 200) {
            const fetchedData = response.data as unknown as { title: string; value: number }[];

            tipoAdministradoras.value = [{ title: '', value: 0 }, ...fetchedData];

            if (internalSelectedTpAdministradora.value) {
                const selected = tipoAdministradoras.value.find(
                    (administradora) => administradora.value === internalSelectedTpAdministradora.value
                );
                if (selected) {
                    internalSelectedTpAdministradora.value = selected.value;
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
