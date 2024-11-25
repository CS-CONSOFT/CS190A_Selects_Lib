<template>
    <v-text-field
        v-model="modelo"
        variant="solo-filled"
        dense
        :clearable="props.Prm_limpavel"
        color="primary"
        :rules="validationRules"
        ref="inputRef"
        placeholder="Digite o CPF"
        v-mask="cpfMask"
        @blur="emitirCpfLimpo"
    >
        <template v-slot:label>
            <span class="d-flex align-center" style="font-size: 12px; font-weight: 500; padding-bottom: 0.2em; color: #808080">
                {{ computedLabel }}<span v-if="props.Prm_isObrigatorio" class="text-error">*</span>
            </span>
        </template>
    </v-text-field>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { mask } from 'vue-the-mask';
import type { VInput } from 'vuetify/components';

const props = defineProps<{
    Prm_etiqueta?: string;
    Prm_limpavel: boolean;
    Prm_isObrigatorio: boolean;
}>();

const computedLabel = computed(() => props.Prm_etiqueta || 'CPF');
const modelo = ref('');
const inputRef = ref<InstanceType<typeof VInput> | null>(null);
const cpfMask = '###.###.###-##';

const emit = defineEmits<{
    (event: 'cpf-limpo', cpf: string): void;
}>();

// Função para limpar CPF
function limparCPF(cpf: string): string {
    return cpf.replace(/\D/g, ''); // Remove tudo que não é número
}

// Validação para CPF
function validarCPF(cpf: string): boolean {
    cpf = limparCPF(cpf);
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;

    return resto === parseInt(cpf.charAt(10));
}

const validationRules = computed(() => {
    const rules = [];
    if (props.Prm_isObrigatorio) {
        rules.push((v: string) => !!v || 'Este campo é obrigatório');
    }

    // Validação para CPF
    rules.push((v: string) => {
        if (typeof v !== 'string') return 'Valor inválido';
        const cleanValue = limparCPF(v);
        if (cleanValue.length === 11) {
            return validarCPF(cleanValue) || 'CPF inválido';
        }
        return true;
    });

    return rules;
});

// Emitir CPF limpo
function emitirCpfLimpo() {
    const cpfLimpo = limparCPF(modelo.value);
    if (validarCPF(cpfLimpo)) {
        emit('cpf-limpo', cpfLimpo); // Emite o CPF limpo
    }
}

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
