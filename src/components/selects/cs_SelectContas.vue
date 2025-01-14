<template>
    <v-select
        v-model="selectedConta"
        :items="filteredContas"
        :loading="loading"
        :rules="props.rules"
        item-value="value"
        item-text="title"
        variant="solo-filled"
        hide-details
        loading-text="Carregando dados..."
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

        <template v-slot:no-data>
            <p>Nenhum dado encontrado.</p>
        </template>

        <template v-slot:progress>
            <v-progress-linear v-if="loading" color="primary" height="10" indeterminate></v-progress-linear>
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
import { getUserFromLocalStorage } from '../../utils/getUserStorage';
import { getEstaticasBB012 } from '../../services/estaticas/bb012_Estaticas';
import { StaticTypesBB012 } from '../../utils/enums/staticTypesBB012';
import { getComboContas } from '../../services/combos/bb012_ComboContas';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{
    Prm_etiqueta?: string;
    Prm_isObrigatorio: boolean;
    modRelacao: number;
    rules?: Array<(v: string) => true | string>;
}>();

const user = getUserFromLocalStorage();
const tenant = user?.TenantId;
const contas = ref<{ title: string; value: string }[]>([]);
const selectedConta = ref<string | null>(null);
const loading = ref(false);
const search = ref<string>('');
const errors = ref<string[]>([]);

const computedLabel = computed(() => props.Prm_etiqueta || 'Selecione uma conta');

const filteredContas = computed(() => {
    const contasComItemVazio = [{ title: '', value: '' }, ...contas.value];

    if (!search.value) {
        return contasComItemVazio;
    }

    const searchText = search.value.toLowerCase();
    return contasComItemVazio.filter((item) => item.title.toLowerCase().includes(searchText));
});

const fetchContas = async () => {
    loading.value = true;
    try {
        // Chamada à primeira API
        const response = await getEstaticasBB012(StaticTypesBB012.CSICP_BB012_MREL);
        const estaticasBB012 = response.data as unknown as { title: string; value: number }[];

        let labelToSearch: string;
        switch (props.modRelacao) {
            case 1:
                labelToSearch = 'Fornecedor';
                break;
            case 2:
                labelToSearch = 'Cliente/Fornecedor';
                break;
            case 3:
                labelToSearch = 'Cliente';
                break;
            default:
                throw new Error(`Valor inesperado para modRelacao: ${props.modRelacao}`);
        }

        const relacaoFiltrada = estaticasBB012.find((item) => item.title === labelToSearch);

        if (relacaoFiltrada) {
            const responseContas = await getComboContas(tenant, relacaoFiltrada.value.toString(), search.value);
            if (responseContas.status === 200) {
                contas.value = responseContas.data as unknown as { title: string; value: string }[];

                if (selectedConta.value) {
                    const selected = contas.value.find((conta) => conta.value === selectedConta.value);
                    if (selected) {
                        selectedConta.value = selected.value;
                    }
                }
            } else {
                console.error('Erro ao buscar contas:', responseContas.statusText);
            }
        } else {
            console.error('Nenhum tipo de relação encontrado para:', labelToSearch);
        }
    } catch (error) {
        console.error('Erro ao buscar estáticas ou contas:', error);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchContas();
});

watch(selectedConta, (newValue) => {
    emit('update:modelValue', newValue);
});

function emitSelection() {
    emit('update:modelValue', selectedConta.value);
}

function validate() {
    errors.value = [];
    if (props.rules) {
        for (const rule of props.rules) {
            const result = rule(selectedConta.value || '');
            if (result !== true) {
                errors.value.push(result);
            }
        }
    }
    return errors.value.length === 0;
}

defineExpose({ validate });
</script>
