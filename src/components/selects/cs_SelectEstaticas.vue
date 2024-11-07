<template>
    <v-select
        :items="formattedItems"
        item-text="title"
        item-value="value"
        variant="solo-filled"
        v-model="selectedItem"
        :loading="loading"
        :readonly="readonly"
    >
        <template v-slot:label>
            <span class="d-flex align-center" style="font-size: 12px; font-weight: 500; padding-bottom: 0.1em; color: #808080">
                {{ computedLabel }}<span v-if="props.Prm_isObrigatorio" class="text-error">*</span>
            </span>
        </template>
    </v-select>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue';
import axios from 'axios';

interface Item {
    Id: number;
    Label: string;
    TipoRegistro: number;
    Order: number;
}

//Tipo = 1: Referente a SIM,NAO
//Tipo = 2: Referente a ATIVO,INATIVO

const props = defineProps<{
    Tipo: number;
    modelValue: any;
    Prm_etiqueta?: string;
    readonly?: boolean;
    Prm_isObrigatorio?: boolean;
}>();

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione uma opção');

const emit = defineEmits(['update:modelValue']);

const items = ref<Item[]>([]);
const loading = ref(false);

const formattedItems = computed(() => {
    return [
        { title: '', value: 0 },
        ...items.value.map((item) => ({
            title: item.Label,
            value: item.Id
        }))
    ];
});

const selectedItem = ref<number | null>(props.modelValue);

const fetchData = async () => {
    loading.value = true;
    try {
        const response = await axios.get(
            `https://dsv17.csicorpnet.com.br/CSR_BB100_Tabelas_LIB/rest/CS_Estaticas/Get_Statica?In_Tipo=${props.Tipo}`
        );
        items.value = response.data;
        const selectedItemObj = items.value.find((item) => item.Id === props.modelValue);
        if (selectedItemObj) {
            selectedItem.value = selectedItemObj.Id;
        }
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    } finally {
        loading.value = false;
    }
};

onMounted(fetchData);

watch(
    () => selectedItem.value,
    (newValue) => {
        emit('update:modelValue', newValue || 0);
    }
);

watch(
    () => props.modelValue,
    (newValue) => {
        const selectedItemObj = items.value.find((item) => item.Id === newValue);
        if (selectedItemObj) {
            selectedItem.value = selectedItemObj.Id;
        } else {
            selectedItem.value = null;
        }
    }
);
</script>
