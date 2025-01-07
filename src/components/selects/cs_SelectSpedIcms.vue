<template>
    <v-select
        v-model="internalSelectedDocumento"
        :items="filteredDoc"
        :rules="props.rules"
        item-value="value"
        item-text="title"
        variant="solo-filled"
        hide-details
        @change="emitSelection"
        :menu-props="{ offsetY: true, width: '40%' }"
    >
        <template v-slot:prepend-item>
            <v-row class="sticky-search-field pa-0">
                <v-text-field
                    class="pa-2"
                    v-model="search"
                    prepend-inner-icon="mdi-magnify"
                    label="Pesquisar"
                    single-line
                    variant="solo-filled"
                    hide-details
                    clearable
                    style="margin-bottom: 5px"
                />
            </v-row>
        </template>

        <template v-slot:label>
            <span class="d-flex align-center" style="font-size: 12px; font-weight: 500; padding-bottom: 0.1em; color: #808080">
                {{ computedLabel }}<span v-if="props.Prm_isObrigatorio" class="text-error">*</span>
            </span>
        </template>
    </v-select>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { getEstaticasSPED } from '@/services/estaticasNovas/Sped_Estaticas';
import { StaticTypeSPED } from '@/utils/enums/staticTypeSPED';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{
    Prm_etiqueta?: string;
    Prm_isObrigatorio: boolean;
    rules?: Array<(v: string) => true | string>;
}>();

const documentos = ref<{ title: string; value: string }[]>([]);
const internalSelectedDocumento = ref<string | null>(null);
const search = ref<string>('');
const errors = ref<string[]>([]);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um modelo de documento');

const filteredDoc = computed(() => {
    const docsComItemVazio = [{ title: '', value: '0' }, ...documentos.value];

    if (!search.value) {
        return docsComItemVazio;
    }

    const searchText = search.value.toLowerCase();
    return docsComItemVazio.filter((item) => item.title.toLowerCase().includes(searchText));
});

const fetchDocumentosFiscais = async () => {
    try {
        const response = await getEstaticasSPED(StaticTypeSPED.SpedInDocIcm);
        if (response.status === 200) {
            documentos.value = response.data as unknown as { title: string; value: string }[];
            if (internalSelectedDocumento.value) {
                const selected = documentos.value.find((documento) => documento.value === internalSelectedDocumento.value);
                if (selected) {
                    internalSelectedDocumento.value = selected.value;
                }
            }
        } else {
            console.error('Erro ao buscar os documentos fiscais:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os documentos fiscais:', error);
    }
};

onMounted(async () => {
    await fetchDocumentosFiscais();
});

watch(internalSelectedDocumento, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedDocumento.value);
}

function validate() {
    errors.value = [];
    const valueToValidate = internalSelectedDocumento.value?.toString() || '';

    if (props.rules) {
        for (const rule of props.rules) {
            const result = rule(valueToValidate);
            if (result !== true) {
                errors.value.push(result);
            }
        }
    }
    return errors.value.length === 0;
}

defineExpose({ validate });
</script>
