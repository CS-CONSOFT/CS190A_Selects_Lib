import { defineStore } from 'pinia';

interface CustomizerState {
    Sidebar_drawer: boolean;
    Customizer_drawer: boolean;
    mini_sidebar: boolean;
    setHorizontalLayout: boolean;
    setRTLLayout: boolean;
    actTheme: string;
    inputBg: string;
    boxed: boolean;
    setBorderCard: boolean;
}

function loadState(): Partial<CustomizerState> {
    const savedState = localStorage.getItem('customizerState');
    const defaultState = { Sidebar_drawer: true }; // Sidebar_drawer default to true
    return savedState ? { ...defaultState, ...JSON.parse(savedState) } : defaultState;
}

function saveState(state: CustomizerState) {
    localStorage.setItem('customizerState', JSON.stringify(state));
}

export const useCustomizerStore = defineStore({
    id: 'customizer',
    state: (): CustomizerState => ({
        Sidebar_drawer: true, // Default to true
        Customizer_drawer: false,
        mini_sidebar: false,
        setHorizontalLayout: false,
        setRTLLayout: false,
        actTheme: 'light',
        inputBg: '',
        boxed: false,
        setBorderCard: false,
        ...loadState() // Apply the loaded state here
    }),
    getters: {},
    actions: {
        SET_SIDEBAR_DRAWER() {
            this.Sidebar_drawer = !this.Sidebar_drawer;
            saveState(this.$state);
        },
        SET_MINI_SIDEBAR(payload: boolean) {
            this.mini_sidebar = payload;
            saveState(this.$state);
        },
        SET_CUSTOMIZER_DRAWER(payload: boolean) {
            this.Customizer_drawer = payload;
            saveState(this.$state);
        },
        SET_LAYOUT(payload: boolean) {
            this.setHorizontalLayout = payload;
            saveState(this.$state);
        },
        SET_THEME(payload: string) {
            this.actTheme = payload;
            saveState(this.$state);
        },
        SET_CARD_BORDER(payload: boolean) {
            this.setBorderCard = payload;
            saveState(this.$state);
        }
    }
});
