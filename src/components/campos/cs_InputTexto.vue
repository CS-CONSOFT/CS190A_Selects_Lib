<template>
    <component
        :is="textArea ? 'v-textarea' : 'v-text-field'"
        v-model="modelo"
        variant="solo-filled"
        dense
        :clearable="props.Prm_limpavel"
        color="primary"
        :rows="textArea ? 4 : undefined"
        :rules="validationRules"
        :maxlength="props.Prm_QuantiCaracteres ?? 50"
        ref="inputRef"
    >
        <template v-slot:label>
            <span class="d-flex align-center" style="font-size: 12px; font-weight: 500; padding-bottom: 0.2em; color: #808080">
                {{ props.Prm_etiqueta }}<span v-if="props.Prm_isObrigatorio" class="text-error">*</span>
            </span>
        </template>
    </component>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { VInput } from 'vuetify/components';

const props = defineProps<{
    Prm_etiqueta: string;
    Prm_limpavel: boolean;
    Prm_isObrigatorio: boolean;
    PrmTextArea?: boolean;
    Prm_QuantiCaracteres?: number;
}>();

const textArea = computed(() => props.PrmTextArea ?? false);
const modelo = ref('');

const validationRules = computed(() => {
    const rules = [];
    if (props.Prm_isObrigatorio) {
        rules.push((v: string) => !!v || 'Este campo é obrigatório');
    }
    return rules;
});

const inputRef = ref<InstanceType<typeof VInput> | null>(null);

const validate = () => inputRef.value?.validate?.();

defineExpose({
    validate
});
</script>
