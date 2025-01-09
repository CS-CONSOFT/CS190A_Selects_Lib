<template>
    <v-select
        v-model="internalSelectedTpDocumento"
        :items="tipoDocumento"
        item-value="value"
        item-text="title"
        variant="solo-filled"
        hide-details
        @change="emitSelection"
        return-object
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
import { getEstaticasBB012 } from '../../services/estaticas/bb012_Estaticas';
import { StaticTypesBB012 } from '../../utils/enums/staticTypesBB012';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const tipoDocumento = ref<{ title: string; value: number }[]>([]);
const internalSelectedTpDocumento = ref<number | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um tipo');

const fetchClasse = async () => {
    try {
        //Alterar para o tipo de estatica correto bb012mdc
        const response = await getEstaticasBB012(StaticTypesBB012.CSICP_BB012_MDC);
        if (response.status === 200) {
            const fetchedData = response.data as unknown as { title: string; value: number }[];

            tipoDocumento.value = [{ title: '', value: 0 }, ...fetchedData];

            if (internalSelectedTpDocumento.value) {
                const selected = tipoDocumento.value.find((documento) => documento.value === internalSelectedTpDocumento.value);
                if (selected) {
                    internalSelectedTpDocumento.value = selected.value;
                }
            }
        } else {
            console.error('Erro ao buscar os tipos:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os tipos:', error);
    }
};

onMounted(async () => {
    await fetchClasse();
});

watch(internalSelectedTpDocumento, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedTpDocumento.value);
}
</script>
