<template>
    <v-text-field v-model="modelo" variant="solo-filled" dense :clearable="props.Prm_limpavel" color="primary"
        :rules="validationRules" ref="inputRef" placeholder="Digite o CNPJ" v-mask="cnpjMask"
        @click:clear="limparDados">
        <template v-slot:label>
            <span class="d-flex align-center"
                style="font-size: 12px; font-weight: 500; padding-bottom: 0.2em; color: #808080">
                {{ computedLabel }}<span v-if="props.Prm_isObrigatorio" class="text-error">*</span>
            </span>
        </template>
    </v-text-field>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { mask } from 'vue-the-mask';
import { VTextField } from 'vuetify/components';
import { getCnpj } from '../../services/outros/receita/getcnpj';

const props = defineProps<{
    Prm_etiqueta?: string;
    Prm_limpavel: boolean;
    Prm_isObrigatorio: boolean;
}>();

const emit = defineEmits<{
    (e: 'cnpjData', data: any): void;
}>();

const computedLabel = computed(() => props.Prm_etiqueta || 'CNPJ');
const modelo = ref('');
const inputRef = ref<InstanceType<typeof VTextField> | null>(null); // Tipo ajustado
const cnpjMask = '##.###.###/####-##';
const cnpjData = ref<any>(null);

// Validação de CNPJ
function validarCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/\D/g, '');
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    return resultado === parseInt(digitos.charAt(1));
}

// Função para consultar CNPJ
async function consultarCnpj(cnpj: string) {
    try {
        const data = await getCnpj(cnpj);
        emit('cnpjData', data); // Emite os dados do CNPJ para o componente pai
    } catch (error) {
        console.error('Erro ao consultar o CNPJ:', error);
    }
}

// Validações para o campo
const validationRules = computed(() => {
    const rules = [];
    if (props.Prm_isObrigatorio) {
        rules.push((v: string) => !!v || 'Este campo é obrigatório');
    }

    rules.push((v: string) => {
        if (typeof v !== 'string') return true;
        const cleanValue = v.replace(/\D/g, '');
        if (cleanValue.length === 14) {
            const isValid = validarCNPJ(cleanValue);
            if (isValid) {
                consultarCnpj(cleanValue); // Se o CNPJ for válido, consulta a API
                return true;
            } else {
                return 'CNPJ inválido';
            }
        }
        return true;
    });

    return rules;
});

function limparDados() {
    modelo.value = ''; // Limpa o campo de entrada
    cnpjData.value = null; // Limpa os dados relacionados ao CNPJ
    emit('cnpjData', null); // Emite o dado limpo para o componente pai
}

// Expondo a função de validação
const validate = () => inputRef.value?.validate?.();

defineExpose({
    validate
});
</script>

<script lang="ts">
export default {
    directives: {
        mask
    }
};
</script>
