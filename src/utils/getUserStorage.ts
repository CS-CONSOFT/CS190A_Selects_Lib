import type { User } from '../types/login/Login';

export function getUserFromLocalStorage(): User | null {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
        try {
            return JSON.parse(storedUser) as User;
        } catch (e) {
            console.error('Erro ao parsear o usuário do localStorage', e);
            return null;
        }
    }

    return null;
}

export function setUserToSessionStorage(user: User): void {
    try {
        const userString = JSON.stringify(user);
        sessionStorage.setItem('user', userString);
    } catch (e) {
        console.error('Erro ao salvar o usuário no sessionStorage', e);
    }
}
