<template>
    <v-text-field v-model="modelo" variant="solo-filled" dense :clearable="props.Prm_limpavel" color="primary"
        :rules="validationRules" ref="inputRef" placeholder="Digite o celular" v-mask="celularMask">
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
import type { VInput } from 'vuetify/components';

const props = defineProps<{
    Prm_etiqueta?: string;
    Prm_limpavel: boolean;
    Prm_isObrigatorio: boolean;
}>();

const computedLabel = computed(() => props.Prm_etiqueta || 'Celular');
const modelo = ref('');
const inputRef = ref<InstanceType<typeof VInput> | null>(null);
const celularMask = '(##) #####-####';

function validarCelular(celular: string): boolean {
    return /^(\d{2})(9\d{8})$/.test(celular);
}

const validationRules = computed(() => {
    const rules = [];
    if (props.Prm_isObrigatorio) {
        rules.push((v: string) => !!v || 'Este campo é obrigatório');
    }

    rules.push((v: string) => {
        const cleanValue = v.replace(/\D/g, '');
        if (cleanValue.length === 11) {
            return validarCelular(cleanValue) || 'Número de celular inválido';
        }
        return 'Número de celular deve ter 11 dígitos (DDD + número)';
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
        mask
    }
};
</script>
