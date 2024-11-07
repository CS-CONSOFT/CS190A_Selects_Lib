<template>
    <v-select
        v-model="internalSelectedZona"
        :items="formattedZona"
        item-value="value"
        :rules="props.rules"
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
import { GetListZonas } from '../../services/basico/combos/bb010_comboZona';
import type { Lista_bb010 } from '../../types/basico/zona/bb010_zona';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{
    Prm_etiqueta?: string;
    Prm_isObrigatorio: boolean;
    rules?: Array<(v: string) => true | string>;
}>();

const user = getUserFromLocalStorage();
const tenant = user?.TenantId;
const zona = ref<Lista_bb010[]>([]);
const internalSelectedZona = ref<string | null>(null);
const errors = ref<string[]>([]);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione uma zona');

const formattedZona = computed(() => {
    return [
        { title: '', value: '' },
        ...zona.value.map((item) => ({
            title: item.BB010_Zona,
            value: item.ID
        }))
    ];
});

const fetchZona = async () => {
    try {
        const response = await GetListZonas(tenant);
        if (response.status === 200) {
            zona.value = response.data.Lista_bb010;
            if (internalSelectedZona.value) {
                const selected = zona.value.find((zona) => zona.ID === internalSelectedZona.value);
                if (selected) {
                    internalSelectedZona.value = selected.ID;
                }
            }
        } else {
            console.error('Erro ao buscar as zonas', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar as zonas:', error);
    }
};

onMounted(async () => {
    getUserFromLocalStorage();
    await fetchZona();
});

watch(internalSelectedZona, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedZona.value);
}

function validate() {
    errors.value = [];
    if (props.rules) {
        for (const rule of props.rules) {
            const result = rule(internalSelectedZona.value || '');
            if (result !== true) {
                errors.value.push(result);
            }
        }
    }
    return errors.value.length === 0;
}

defineExpose({ validate });
</script>
