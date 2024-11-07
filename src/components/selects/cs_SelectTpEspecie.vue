<template>
    <v-select
        v-model="internalSelectedTpEspecie"
        :items="formattedTpEspecie"
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
import { getListEstaticasFF } from '../../services/estaticas/estaticas_ff';
import type { Csicp_ff003_TpEsp_List } from '../../types/basico/estaticas/FF/ff_estaticas';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{
    Prm_etiqueta?: string;
    Prm_isObrigatorio: boolean;
    rules?: Array<(v: string) => true | string>;
}>();

const tipoEspecie = ref<Csicp_ff003_TpEsp_List[]>([]);
const internalSelectedTpEspecie = ref<number | null>(null);
const errors = ref<string[]>([]);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um tipo para a forma de pagamento');

const formattedTpEspecie = computed(() => {
    return [
        { title: '', value: 0 },
        ...tipoEspecie.value.map((item) => ({
            title: item.Label,
            value: item.Id
        }))
    ];
});

const fetchTipoEspecie = async () => {
    try {
        const response = await getListEstaticasFF();
        if (response.status === 200) {
            tipoEspecie.value = response.data.csicp_ff003_TpEsp_List;
            if (internalSelectedTpEspecie.value) {
                const selected = tipoEspecie.value.find((especie) => especie.Id === internalSelectedTpEspecie.value);
                if (selected) {
                    internalSelectedTpEspecie.value = selected.Id;
                }
            }
        } else {
            console.error('Erro ao buscar o tipo espécie:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar o tipo espécie:', error);
    }
};

onMounted(async () => {
    await fetchTipoEspecie();
});

watch(internalSelectedTpEspecie, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedTpEspecie.value);
}
</script>
