<template>
    <v-text-field v-model="modelo" variant="solo-filled" dense :clearable="props.Prm_limpavel" color="primary"
        :rules="validationRules" ref="inputRef" placeholder="Digite o telefone" v-mask="telefoneMask">
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
//import { mask } from 'vue-the-mask';
import type { VInput } from 'vuetify/components';

const props = defineProps<{
    Prm_etiqueta?: string;
    Prm_limpavel: boolean;
    Prm_isObrigatorio: boolean;
}>();

const computedLabel = computed(() => props.Prm_etiqueta || 'Telefone');
const modelo = ref('');
const inputRef = ref<InstanceType<typeof VInput> | null>(null);
const telefoneMask = '(##) ####-####';

function validarTelefoneFixo(telefone: string): boolean {
    return /^(\d{2})([2-8]\d{7})$/.test(telefone);
}

const validationRules = computed(() => {
    const rules = [];
    if (props.Prm_isObrigatorio) {
        rules.push((v: string) => !!v || 'Este campo é obrigatório');
    }

    rules.push((v: string) => {
        const cleanValue = v.replace(/\D/g, '');
        if (cleanValue.length === 10) {
            return validarTelefoneFixo(cleanValue) || 'Número de telefone fixo inválido';
        }
        return 'Número de telefone fixo deve ter 10 dígitos (DDD + número)';
    });

    return rules;
});

const validate = () => inputRef.value?.validate?.();

defineExpose({
    validate
});
</script>

<script lang="ts">
export default {
    directives: {
        //mask
    }
};
</script>
