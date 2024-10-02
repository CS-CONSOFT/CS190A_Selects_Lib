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
        :menu-props="{ offsetY: true, width: '70%' }"
    >
        <template v-slot:prepend-item>
            <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" label="Pesquisar" single-line hide-details clearable />
        </template>

        <template v-slot:label>
            <span class="d-flex align-center" style="font-size: 12px; font-weight: 500; padding-bottom: 0.1em; color: #808080">
                {{ computedLabel }}<span v-if="props.Prm_isObrigatorio" class="text-error">*</span>
            </span>
        </template>
    </v-select>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits, defineExpose, onMounted, watch } from 'vue';
import { getListEstaticasSpedICMS } from '@/services/estaticas/sped_icms';
import type { SpedInICMS } from '@/types/basico/estaticas/SPED/sped_in_icms_estaticas';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{
    Prm_etiqueta?: string;
    Prm_isObrigatorio: boolean;
    rules?: Array<(v: string) => true | string>;
}>();

const documentos = ref<SpedInICMS[]>([]);
const internalSelectedDocumento = ref<string | null>(null);
const search = ref<string>('');
const errors = ref<string[]>([]);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione um modelo de documento');

const filteredDoc = computed(() => {
    if (!search.value) {
        return documentos.value.map((item) => ({
            title: `${item.Label}`,
            value: item.Id
        }));
    }

    const searchText = search.value.toLowerCase();
    return documentos.value
        .filter((item) => item.Codigo.toLowerCase().includes(searchText) || item.Label.toLowerCase().includes(searchText))
        .map((item) => ({
            title: `${item.Label}`,
            value: item.Id
        }));
});

const fetchDocumentosFiscais = async () => {
    try {
        const response = await getListEstaticasSpedICMS();
        if (response.status === 200) {
            documentos.value = response.data.sped_in_doc_ICMS;
            if (internalSelectedDocumento.value) {
                const selected = documentos.value.find((documento) => documento.Id === Number(internalSelectedDocumento.value));
                if (selected) {
                    internalSelectedDocumento.value = selected.Id.toString();
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
    if (props.rules) {
        for (const rule of props.rules) {
            const result = rule(internalSelectedDocumento.value || '');
            if (result !== true) {
                errors.value.push(result);
            }
        }
    }
    return errors.value.length === 0;
}

defineExpose({ validate });
</script>
