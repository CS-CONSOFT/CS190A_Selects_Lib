<template>
    <v-text-field
        v-model="modelo"
        variant="solo-filled"
        dense
        :clearable="props.Prm_limpavel"
        color="primary"
        :rules="activeValidationRules"
        ref="inputRef"
        placeholder="Digite o celular"
        v-mask="celularMask"
        @blur="hasInteracted = true"
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

// Props recebidas
const props = defineProps<{
    Prm_etiqueta?: string;
    Prm_limpavel: boolean;
    Prm_isObrigatorio: boolean;
}>();

// Computed para o rótulo
const computedLabel = computed(() => props.Prm_etiqueta || 'Celular');

// Estado do modelo
const modelo = ref('');
const inputRef = ref<InstanceType<typeof VInput> | null>(null);
const celularMask = '(##) #####-####';

// Estado para controlar interação
const hasInteracted = ref(false);

// Função de validação do celular
function validarCelular(celular: string): boolean {
    return /^(\d{2})(9\d{8})$/.test(celular);
}

// Regras de validação completas
const validationRules = computed(() => {
    const rules = [];

    if (props.Prm_isObrigatorio) {
        rules.push((v: string) => !!v || 'Este campo é obrigatório');
    }

    rules.push((v: string) => {
        const cleanValue = v.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (cleanValue.length === 11) {
            return validarCelular(cleanValue) || 'Número de celular inválido';
        }
        return 'Número de celular deve ter 11 dígitos (DDD + número)';
    });

    return rules;
});

// Regras de validação ativas
const activeValidationRules = computed(() => {
    if (hasInteracted.value) {
        return validationRules.value; // Aplica as regras somente após interação
    }
    return []; // Nenhuma regra antes da interação
});

// Função de validação manual
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
