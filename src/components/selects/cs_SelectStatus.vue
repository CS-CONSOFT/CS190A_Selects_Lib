<template>
    <v-select
        v-model="internalSelectedStatus"
        :items="formattedStatus"
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
import type { Csicp_bb012_StaCta } from '../../types/estaticas/BB/bb012_Estaticas';

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
}>();

const props = defineProps<{ Prm_etiqueta?: string; Prm_isObrigatorio: boolean }>();

const status = ref<Csicp_bb012_StaCta[]>([]);
const internalSelectedStatus = ref<number | null>(null);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um status');

const formattedStatus = computed(() => {
    return [
        { title: '', value: 0 },
        ...status.value.map((item) => ({
            title: item.Label,
            value: item.Id
        }))
    ];
});

const fetchStatus = async () => {
    try {
        const response = await GetListEstaticasBB012();
        if (response.status === 200) {
            status.value = response.data.csicp_bb012_StaCta;
            if (internalSelectedStatus.value) {
                const selected = status.value.find((status) => status.Id === internalSelectedStatus.value);
                if (selected) {
                    internalSelectedStatus.value = selected.Id;
                }
            }
        } else {
            console.error('Erro ao buscar os status:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os status:', error);
    }
};

onMounted(async () => {
    await fetchStatus();
});

watch(internalSelectedStatus, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedStatus.value);
}
</script>
