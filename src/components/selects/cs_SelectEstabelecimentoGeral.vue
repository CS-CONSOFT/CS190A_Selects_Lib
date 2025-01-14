<template>
    <v-col v-if="loading">
        <v-progress-circular color="blue" height="10" indeterminate></v-progress-circular>
        <span class="d-flex align-center" style="font-size: 12px; font-weight: 500; padding-bottom: 0.1em; color: #808080">
            Procurando estabelecimentos
        </span>
    </v-col>

    <v-select
        v-if="!loading"
        v-model="selectedItem"
        :items="formattedList"
        item-value="value"
        item-text="title"
        variant="solo-filled"
        hide-details
        @change="emitSelection"
        class="custom-select"
    >
        <template v-slot:label>
            <span class="d-flex align-center" style="font-size: 12px; font-weight: 500; padding-bottom: 0.1em; color: #808080">
                {{ props.Prm_etiqueta }}<span v-if="props.Prm_isObrigatorio" class="text-error">*</span>
            </span>
        </template>
    </v-select>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { getUserFromLocalStorage } from '../../utils/getUserStorage';
import { getCombosBB } from '../../services/combos/bb_Combos';
import { ComboTypesBB } from '../../utils/enums/comboTypeBB';

const props = defineProps<{
    selectedItem: string | null;
    modelValue: string | null;
    Prm_etiqueta: string;
    Prm_isObrigatorio?: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const user = getUserFromLocalStorage();
const tenant = user?.TenantId;

const selectedItem = ref<string | null>(props.modelValue);
const formattedList = ref<{ title: string; value: string }[]>([]);
const loading = ref(false);

const fetchEstabelecimentos = async () => {
    loading.value = true;
    try {
        const response = await getCombosBB(tenant, ComboTypesBB.csicp_bb001_razao_codg);
        if (response.status === 200) {
            const fetchedData = response.data as unknown as { title: string; value: string }[];

            formattedList.value = [{ title: '', value: '' }, ...fetchedData];

            if (selectedItem.value) {
                const selected = formattedList.value.find((estab) => estab.value === selectedItem.value);
                if (selected) {
                    selectedItem.value = selected.value;
                }
            }
        } else {
            console.error('Erro ao buscar os estabelecimentos:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os estabelecimentos:', error);
    } finally {
        loading.value = false;
    }
};

watch(selectedItem, (newVal) => {
    emit('update:modelValue', newVal);
});

onMounted(() => {
    fetchEstabelecimentos();
});

function emitSelection() {
    emit('update:modelValue', selectedItem.value);
}
</script>
