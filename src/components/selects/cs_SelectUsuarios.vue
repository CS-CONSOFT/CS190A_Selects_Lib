<template>
    <v-select
        v-model="internalSelectedUsuario"
        :items="formattedUsuarios"
        :rules="props.rules"
        item-value="value"
        item-text="title"
        variant="solo-filled"
        hide-details
        @change="emitSelection"
    >
        <template v-slot:label>
            <span class="d-flex align-center" style="font-size: 12px; font-weight: 500; padding-bottom: 0.1em; color: #808080">
                {{ computedLabel }}<span v-if="props.Prm_isObrigatorio" class="text-error">*</span>
            </span>
        </template>
    </v-select>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits, defineExpose, onMounted, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { getListUsuariosCombo } from '@/services/usuarios/combos/sy001_comboUsuarios';
import type { Usuarios_List } from '@/types/basico/usuario/combos/Combo_UsuarioTypes';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
}>();

const props = defineProps<{
    Prm_etiqueta?: string;
    Prm_isObrigatorio: boolean;
    rules?: Array<(v: string) => true | string>;
}>();

const authStore = useAuthStore();
const tenant = authStore.user?.TenantId;
const usuarios = ref<Usuarios_List[]>([]);
const internalSelectedUsuario = ref<string | null>(null);
const errors = ref<string[]>([]);

const computedLabel = computed(() => props.Prm_etiqueta || 'Usuário');

const formattedUsuarios = computed(() => {
    return [
        { title: '', value: null },
        ...usuarios.value.map((item) => ({
            title: item.SY001_Usuario,
            value: item.Id
        }))
    ];
});

const fetchUsuarios = async () => {
    try {
        const response = await getListUsuariosCombo(tenant);
        if (response.status === 200) {
            usuarios.value = response.data.Usuarios_List;
            if (internalSelectedUsuario.value) {
                const selected = usuarios.value.find((usuario) => usuario.Id === internalSelectedUsuario.value);
                if (selected) {
                    internalSelectedUsuario.value = selected.Id;
                }
            }
        } else {
            console.error('Erro ao buscar os usuários:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao buscar os usuários:', error);
    }
};

onMounted(async () => {
    await fetchUsuarios();
});

watch(internalSelectedUsuario, (newVal) => {
    emit('update:modelValue', newVal);
});

function emitSelection() {
    emit('update:modelValue', internalSelectedUsuario.value);
}

function validate() {
    errors.value = [];
    if (props.rules) {
        for (const rule of props.rules) {
            const result = rule(internalSelectedUsuario.value || '');
            if (result !== true) {
                errors.value.push(result);
            }
        }
    }
    return errors.value.length === 0;
}

defineExpose({ validate });
</script>
