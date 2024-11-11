<template>
    <v-text-field
        v-model="modelo"
        variant="solo-filled"
        dense
        :clearable="props.Prm_limpavel"
        color="primary"
        :rules="validationRules"
        :maxlength="9"
        ref="inputRef"
        @input="onInput"
    >
        <template v-slot:label>
            <span class="d-flex align-center" style="font-size: 12px; font-weight: 500; padding-bottom: 0.2em; color: #808080">
                {{ props.Prm_etiqueta }}<span v-if="props.Prm_isObrigatorio" class="text-error">*</span>
            </span>
        </template>
    </v-text-field>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { VInput } from 'vuetify/components';

const props = defineProps<{
    Prm_etiqueta: string;
    Prm_limpavel: boolean;
    Prm_isObrigatorio: boolean;
}>();

// Definindo o modelo como string para capturar a entrada de texto
const modelo = ref<string>('');

// Função para permitir apenas números inteiros
const onInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    // Mantém apenas números inteiros na entrada
    modelo.value = input.value.replace(/\D/g, '');
};

// Regras de validação
const validationRules = computed(() => {
    const rules = [];

    // Regra obrigatória
    if (props.Prm_isObrigatorio) {
        rules.push((v: string) => !!v || 'Este campo é obrigatório');
    }

    // Regra para verificar se o valor contém apenas números
    rules.push((v: string) => /^\d*$/.test(v) || 'Apenas números são permitidos');

    return rules;
});

const inputRef = ref<InstanceType<typeof VInput> | null>(null);

const validate = () => inputRef.value?.validate?.();

defineExpose({
    validate
});
</script>
