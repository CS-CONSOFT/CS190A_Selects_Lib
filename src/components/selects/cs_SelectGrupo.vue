<template>
    <v-select
        v-model="internalSelectedGrupo"
        :items="grupo"
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
import { getEstaticasBB012 } from '../../services/estaticas/bb012_Estaticas';
import { StaticTypesBB012 } from '../../utils/enums/staticTypesBB012';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const grupo = ref<{ title: string; value: string }[]>([]);
const internalSelectedGrupo = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um grupo');

const fetchGrupo = async () => {
    try {
        const response = await getEstaticasBB012(StaticTypesBB012.CSICP_BB012_GRUCTA);
        if (response.status === 200) {
            const fetchedData = response.data as unknown as { title: string; value: string }[];

            grupo.value = [{ title: '', value: '0' }, ...fetchedData];

            if (internalSelectedGrupo.value) {
                const selected = grupo.value.find((grupo) => grupo.value === internalSelectedGrupo.value);
                if (selected) {
                    internalSelectedGrupo.value = selected.value;
                }
            }
        } else {
            console.error('Erro ao buscar os grupos:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os grupos:', error);
    }
};

onMounted(async () => {
    await fetchGrupo();
});

watch(internalSelectedGrupo, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedGrupo.value);
}
</script>
