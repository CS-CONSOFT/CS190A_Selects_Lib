<template>
    <v-card elevation="10" class="py-2">
        <span class="lstick"></span>
        <v-card-text>
            <div>
                <h3 class="text-h5 title mb-1">Gestão</h3>
            </div>
            <div class="my-8 pt-8 position-relative">
                <canvas ref="doughnutChart" class="chartDoughnut"></canvas>
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, Ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { getPrimary, getLightPrimary, getSecondary } from '@/utils/UpdateColors';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend, Title, ChartOptions, ChartData } from 'chart.js';
Chart.register(DoughnutController, ArcElement, Tooltip, Legend, Title);

// Import das APIs
import { GetUsuarioCompleto } from '@/services/gestao/charts/sy001_usuarios';
import { GetEstabCompleto } from '@/services/gestao/charts/bb0001_estabelecimentos';
import { GetGrupoCompleto } from '@/services/gestao/charts/sy002_grupos';

// Referência ao canvas do gráfico
const doughnutChart = ref<HTMLCanvasElement | null>(null);
let doughnutChartInstance: Chart<'doughnut'> | null = null;

// Variáveis para armazenar os contadores de cada entidade
const countUsuarios = ref<number>(0);
const countGrupos = ref<number>(0);
const countEstabelecimentos = ref<number>(0);

const authStore = useAuthStore();
const tenant = authStore.user?.TenantId;

// Dados do gráfico
const chartData = computed<ChartData<'doughnut'>>(() => ({
    labels: ['Usuários', 'Grupos', 'Estabelecimentos'],
    datasets: [
        {
            label: 'Distribuição',
            data: [countUsuarios.value, countGrupos.value, countEstabelecimentos.value],
            backgroundColor: [getPrimary.value, getLightPrimary.value, getSecondary.value],
            hoverBackgroundColor: [getPrimary.value, getLightPrimary.value, getSecondary.value]
        }
    ]
}));

// Função para renderizar o gráfico Doughnut
const renderDoughnutChart = () => {
    if (doughnutChart.value) {
        const ctx = doughnutChart.value.getContext('2d');
        if (ctx) {
            if (doughnutChartInstance) {
                doughnutChartInstance.destroy();
            }
            doughnutChartInstance = new Chart(ctx, {
                type: 'doughnut',
                data: chartData.value,
                options: chartOptions
            });
        } else {
            console.error('Falha ao obter o contexto');
        }
    }
};

// Opções para o gráfico Doughnut
const chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'top'
        }
    }
};

// Função genérica para chamada de API
const fetchData = async (fetchFunction: () => Promise<any>, countRef: Ref<number>) => {
    try {
        const response = await fetchFunction();
        const data = response.data;
        countRef.value = data.PageSize.cs_list_total_itens || 0;
    } catch (error) {
        console.error('Erro ao buscar dados', error);
    }
};

// Watch nas cores para atualizar o gráfico dinamicamente
watch([getPrimary, getLightPrimary, getSecondary], () => {
    if (doughnutChartInstance) {
        doughnutChartInstance.data.datasets[0].backgroundColor = [getPrimary.value, getLightPrimary.value, getSecondary.value];
        doughnutChartInstance.update();
    }
});

// Watch nas variáveis de dados para atualizar o gráfico quando elas mudarem
watch([countUsuarios, countGrupos, countEstabelecimentos], () => {
    if (doughnutChartInstance) {
        doughnutChartInstance.data.datasets[0].data = [countUsuarios.value, countGrupos.value, countEstabelecimentos.value];
        doughnutChartInstance.update();
    }
});

// Chamadas de API e inicialização do gráfico
onMounted(() => {
    renderDoughnutChart();

    fetchData(() => GetUsuarioCompleto(tenant, true, true, '', 1, 999), countUsuarios);
    fetchData(() => GetEstabCompleto(tenant, true, true, '', 1, 999), countEstabelecimentos);
    fetchData(() => GetGrupoCompleto(tenant, true, true, '', 1, 999), countGrupos);
});
</script>

<style scoped>
.chartDoughnut {
    width: 100%;
}
</style>
