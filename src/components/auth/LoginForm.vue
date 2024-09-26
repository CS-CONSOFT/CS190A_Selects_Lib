<template>
    <v-container class="container-login pa-0">
        <Form @submit="validate" v-slot="{ errors, isSubmitting }" class="mt-5">
            <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">Domínio</v-label>
            <VTextField v-model="dominio" class="mb-8" required hide-details="auto"></VTextField>
            <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">Nome de usuário</v-label>
            <VTextField v-model="username" :rules="userRules" class="mb-8" required hide-details="auto"></VTextField>
            <v-label class="text-subtitle-1 font-weight-medium text-lightText">Senha</v-label>
            <VTextField
                v-model="password"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="togglePasswordVisibility"
                required
                hide-details="auto"
            ></VTextField>
            <v-btn size="large" :loading="isSubmitting" color="primary" :disable="valid" block type="submit" flat class="my-4">Login</v-btn>
            <div v-if="errors.apiError" class="mt-2">
                <v-alert color="error">{{ errors.apiError }}</v-alert>
            </div>
        </Form>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { Form } from 'vee-validate';
import { router } from '@/router';
//import de API's
import { LoginGeral } from '@/services/login/axios_login';

const passwordRules = ref([
    (v: string) => !!v || 'Senha é obrigatória',
    (v: string) => (v && v.length <= 10) || 'A senha deve ter menos de 10 caracteres'
]);

const userRules = ref([
    (v: string) => !!v || 'Nome de usuário obrigatório',
    (v: string) => /^[A-Za-z\s]+$/.test(v) || 'O nome de usuário deve conter apenas letras e espaços'
]);

const dominio = ref('Comercial');
const username = ref('');
const password = ref('');
const valid = ref(false);
const showPassword = ref(false);

function togglePasswordVisibility() {
    showPassword.value = !showPassword.value;
}

function validate(values: any, { setErrors }: any) {
    const reg = {
        Dominio: dominio.value,
        Usuario: username.value,
        Senha: password.value
    };

    return LoginGeral(reg)
        .then((response) => {
            const authStore = useAuthStore();
            const userData = response.data.Model;
            authStore.setUser(userData);
            console.log(userData);
            // Redirecionamento após login bem-sucedido
            router.push('/Home');
        })
        .catch((error) => {
            console.error('Erro ao fazer login:', error);
            setErrors({ apiError: error.message || 'Erro desconhecido ao fazer login' });
        });
}
</script>

<style scoped>
.container-login {
    width: 100%;
    min-width: 380px;
}
</style>
