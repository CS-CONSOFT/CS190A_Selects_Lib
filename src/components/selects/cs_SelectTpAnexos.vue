<template>
    <v-select
        v-model="internalSelectedAnexos"
        :items="anexo"
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
import { getEstaticasBB012 } from '@/services/estaticasNovas/bb012_Estaticas';
import { StaticTypesBB012 } from '@/utils/enums/staticTypesBB012';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const anexo = ref<{ title: string; value: string }[]>([]);
const internalSelectedAnexos = ref<string | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um tipo');

const fetchClasse = async () => {
    try {
        //Alterar o StaticType para a tabela bb012mtd
        const response = await getEstaticasBB012(StaticTypesBB012.CSICP_BB012_MTD);
        if (response.status === 200) {
            const fetchedData = response.data as unknown as { title: string; value: string }[];

            anexo.value = [{ title: '', value: '0' }, ...fetchedData];

            if (internalSelectedAnexos.value) {
                const selected = anexo.value.find((anexo) => anexo.value === internalSelectedAnexos.value);
                if (selected) {
                    internalSelectedAnexos.value = selected.value;
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

watch(internalSelectedAnexos, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedAnexos.value);
}
</script>
