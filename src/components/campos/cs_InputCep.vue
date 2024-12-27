<template>
    <v-row>
        <v-col cols="12" class="d-flex">
            <v-text-field
                v-model="cep"
                label="CEP"
                variant="solo-filled"
                :readonly="props.readonly"
                maxlength="9"
                placeholder="Digite somente números"
                v-mask="'#####-###'"
                :error-messages="cepError"
            >
                <template v-slot:label>
                    <span class="d-flex align-center" style="font-size: 12px; font-weight: 500; padding-bottom: 0.1em; color: #808080">
                        CEP
                        <span v-if="props.Prm_isObrigatorio" class="text-error">*</span>
                    </span>
                </template>
            </v-text-field>

            <v-btn class="v-btn-icon ml-4" icon="mdi-magnify" @click="onInput"></v-btn>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { mask } from 'vue-the-mask';
import { getCep } from '../../services/outros/viacep/viacep';
import type { CEP } from '../../types/enderecamento/CepTypes';

const props = defineProps<{
    initialCep: string | number | null;
    readonly?: boolean;
    Prm_isObrigatorio: boolean;
}>();

const emit = defineEmits<{
    (e: 'cep-info', info: CEP): void;
}>();

// Variáveis reativas
const cep = ref<string>(props.initialCep?.toString() || '');
const cepError = ref<string | null>(null);

// Função chamada ao clicar no botão
const onInput = async () => {
    const cepVal = cep.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    cepError.value = null; // Limpa erros anteriores

    if (cepVal.length === 8) {
        await fetchCep(cepVal);
    } else {
        cepError.value = 'Informe um CEP válido com 8 dígitos.';
    }
};

// Função para buscar o CEP na API
const fetchCep = async (cepVal: string) => {
    try {
        const numericCep = Number(cepVal);
        const info = await getCep(numericCep);

        if ((info as any).erro === 'true') {
            cepError.value = 'CEP inválido';
        } else {
            emit('cep-info', info as CEP); // Emite o evento com o CEP válido
        }
    } catch (error) {
        console.error('Erro ao buscar informações do CEP:', error);
        cepError.value = 'Erro ao buscar informações do CEP';
    }
};

// Atualiza apenas o valor exibido no campo quando a prop muda
watch(
    () => props.initialCep,
    async (newCep) => {
        cep.value = newCep?.toString() || '';
    }
);
</script>

<script lang="ts">
export default {
    directives: {
        mask
    }
};
</script>
