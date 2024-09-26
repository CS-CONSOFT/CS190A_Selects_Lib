export interface Menu {
    header?: string;
    title?: string;
    icon?: string;
    to?: string;
    chip?: string;
    chipBgColor?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: Menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
}

const sidebarItem: Menu[] = [
    { header: 'Home' },
    {
        title: 'Contas',
        icon: 'mdi-account-multiple-outline',
        to: '/Contas'
    },
    {
        title: 'Básico',
        icon: 'mdi-table',
        to: '#',
        children: [
            {
                title: 'Centro de Custo',
                icon: 'mdi-circle-small',
                to: '/CentroDeCusto'
            },
            {
                title: 'Agente Cobrador',
                icon: 'mdi-circle-small',
                to: '/AgenteCobrador'
            },
            {
                title: 'Responsável',
                icon: 'mdi-circle-small',
                to: '/'
            },
            {
                title: 'Forma de Pagamento',
                icon: 'mdi-circle-small',
                to: '/'
            },
            {
                title: 'Condição de Pagamento',
                icon: 'mdi-circle-small',
                to: '/'
            },
            {
                title: 'Natureza da Operação',
                icon: 'mdi-circle-small',
                to: '/'
            },
            {
                title: 'Administradora',
                icon: 'mdi-circle-small',
                to: '/'
            },
            {
                title: 'Funções',
                icon: 'mdi-circle-small',
                to: '/'
            },
            {
                title: 'Cargo',
                icon: 'mdi-circle-small',
                to: '/'
            },
            {
                title: 'Tipo de Cobrança',
                icon: 'mdi-circle-small',
                to: '/'
            },
            {
                title: 'Arquitetos/Compradores',
                icon: 'mdi-circle-small',
                to: '/'
            },
            {
                title: 'MarketPlace',
                icon: 'mdi-circle-small',
                to: '/'
            },
            {
                title: 'Tabela Data Vencimentos',
                icon: 'mdi-circle-small',
                to: '/'
            },
            {
                title: 'Profissional',
                icon: 'mdi-circle-small',
                to: '/'
            }
        ]
    }
];

export default sidebarItem;
