import { defineStore } from 'pinia';
import { router } from '@/router';
import { LoginGeral } from '@/services/login/axios_login';

interface User {
    TenantId: number;
    UsuarioId: string;
    NomeUsuario: string;
    EstabelecimentoId: string;
    NomeEstabelecimento: string;
    UserID: number;
    Estab_Img: string;
}

interface Registro {
    Dominio: string;
    Usuario: string;
    Senha: string;
}

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: null as User | null,
        returnUrl: null as string | null
    }),
    actions: {
        async login(dominio: string, username: string, password: string) {
            try {
                const reg: Registro = {
                    Dominio: dominio,
                    Usuario: username,
                    Senha: password
                };
                const response = await LoginGeral(reg);
                const userData = response.data.Model;
                this.setUser(userData); // armazena os dados do usuário na store
                router.push('/home'); // redireciona para a página home
            } catch (error) {
                throw new Error('Erro ao fazer login');
            }
        },
        setUser(user: User) {
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user)); // armazena no localStorage se necessário
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/'); // redireciona para a página inicial após logout
        },
        checkSession() {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                this.user = JSON.parse(storedUser);
            }
        }
    }
});
