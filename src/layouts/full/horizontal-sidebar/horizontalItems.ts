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
    {
        title: 'Home',
        icon: 'mdi-home',
        to: '#',
        children: [
            {
                title: 'Centro De Custo',
                icon: 'mdi-domain',
                to: '/CentroDeCusto'
            },
            {
                title: 'Contas',
                icon: 'mdi-account-multiple-outline',
                to: '/Contas'
            },
            {
                title: 'Básico',
                icon: 'mdi-table',
                to: '/Basico'
            }
        ]
    }
];

export default sidebarItem;
