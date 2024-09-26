const MainRoutes = {
    path: '/Main',
    meta: {
        requiresAuth: true
    },
    redirect: '/Main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'Home',
            path: '/Home',
            component: () => import('@/views/HomeView.vue'),
            meta: {
                title: 'Home'
            }
        },
        {
            name: 'Basico',
            path: '/Basico',
            component: () => import('@/views/Basico/BasicoView.vue'),
            meta: {
                title: 'Basico'
            }
        },
        {
            name: 'CentroDeCusto',
            path: '/CentroDeCusto',
            component: () => import('@/views/Basico/CentroDeCustoView.vue'),
            meta: {
                title: 'Centro de Custo'
            }
        },
        {
            name: 'AgenteCobrador',
            path: '/AgenteCobrador',
            component: () => import('@/views/Basico/AgenteCobradorView.vue'),
            meta: {
                title: 'Agente Cobrador'
            }
        },
        {
            name: 'Contas',
            path: '/Contas',
            component: () => import('@/views/ContasView.vue'),
            meta: {
                title: 'Contas'
            }
        }
    ]
};

export default MainRoutes;
