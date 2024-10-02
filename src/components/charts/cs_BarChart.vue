<template>
    <v-card elevation="10">
        <span class="lstick"></span>
        <v-card-text>
            <div class="d-sm-flex align-center">
                <div>
                    <p class="text-h5 title mb-1">Tabelas de Totalização</p>
                </div>
                <div class="ml-auto">
                    <div class="d-flex align-center mt-sm-0 mt-3">
                        <div class="d-flex align-baseline">
                            <v-icon color="primary" size="sm">mdi-circle</v-icon>
                            <div class="ml-2">Tabelas</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-5">
                <canvas ref="barChart" :height="300" :width="600"></canvas>
            </div>
        </v-card-text>
    </v-card>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, type Ref, computed } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, type ChartOptions } from 'chart.js';
import { getPrimary, getLightPrimary } from '../../utils/UpdateColors';
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// Import de API's
import { GetCentroDeCustoCompleto } from '../../services/basico/bb005_centrodecusto';
import { GetAgenteCobradorCompleto } from '../../services/basico/bb006_agentecobrador';
import { GetResponsavelCompleto } from '../../services/basico/bb007_responsavel';
import { GetFormasDePagamentoCompleto } from '../../services/basico/bb026_formadepagamento';
import { GetCondicaoDePagamentoCompleto } from '../../services/basico/bb008_condicaodepagamento';
import { GetNaturezaCompleto } from '../../services/basico/bb025_natureza';

// Declaração de variáveis
const barChart = ref<HTMLCanvasElement | null>(null);
const countCentroDeCusto = ref<number>(0);
const countAgenteCobrador = ref<number>(0);
const countResponsavel = ref<number>(0);
const countFormaDePagamento = ref<number>(0);
const countCondicaoDePagamento = ref<number>(0);
const countNatureza = ref<number>(0);
let delayed = ref<boolean>(false);

// Instância do gráfico
let chartInstance: Chart | null = null;

const authStore = useAuthStore();
const tenant = authStore.user?.TenantId;

// Inserção de dados do gráfico
const chartData = computed(() => ({
    labels: ['Centro de Custo', 'Agente Cobrador', 'Responsável', 'Forma de Pagamento', 'Condição de Pagamento', 'Natureza da Operação'],
    datasets: [
        {
            label: 'Tabelas',
            backgroundColor: getPrimary.value,
            borderColor: getLightPrimary.value,
            borderWidth: 1,
            data: [0, 0, 0, 0, 0, 0]
        }
    ]
}));

const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top'
        }
    },
    animation: {
        onComplete: () => {
            delayed.value = true;
        },
        delay: (context: { type: string; mode: string; dataIndex: number; datasetIndex: number }) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default' && !delayed.value) {
                delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
        }
    },
    scales: {
        x: {
            stacked: true
        },
        y: {
            stacked: true
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

// Função para renderizar o gráfico
const renderChart = () => {
    if (barChart.value) {
        const ctx = barChart.value.getContext('2d');
        if (ctx) {
            if (chartInstance) {
                chartInstance.destroy();
            }
            chartInstance = new Chart(ctx, {
                type: 'bar',
                data: chartData.value,
                options: chartOptions
            });
        } else {
            console.error('Falha ao obter o contexto');
        }
    }
};

// Watch nas cores para atualizar o gráfico quando elas mudarem
watch([getPrimary, getLightPrimary], () => {
    if (chartInstance) {
        chartInstance.data.datasets[0].backgroundColor = getPrimary.value;
        chartInstance.data.datasets[0].borderColor = getLightPrimary.value;
        chartInstance.update();
    }
});

// Lista das variáveis e os índices do dataset
const variablesToWatch = [
    { ref: countCentroDeCusto, index: 0 },
    { ref: countAgenteCobrador, index: 1 },
    { ref: countResponsavel, index: 2 },
    { ref: countFormaDePagamento, index: 3 },
    { ref: countCondicaoDePagamento, index: 4 },
    { ref: countNatureza, index: 5 }
];

// Watch dinâmico para atualizar os dados no gráfico
variablesToWatch.forEach(({ ref, index }) => {
    watch(ref, (newVal) => {
        if (chartInstance && chartData.value.datasets[0]) {
            chartData.value.datasets[0].data[index] = newVal;
            chartInstance.update(); // Atualiza o gráfico quando os dados mudam
        }
    });
});

// Chamadas de API e inicialização do gráfico
onMounted(() => {
    renderChart();

    // Chamadas das funções de API usando o fetchData genérico
    fetchData(() => GetCentroDeCustoCompleto(tenant, true, true, '', 1, 999), countCentroDeCusto);
    fetchData(() => GetAgenteCobradorCompleto(tenant, true, true, '', 1, 999), countAgenteCobrador);
    fetchData(() => GetResponsavelCompleto(tenant, true, true, '', 1, 999), countResponsavel);
    fetchData(() => GetFormasDePagamentoCompleto(tenant, true, true, '', 1, 999), countFormaDePagamento);
    fetchData(() => GetCondicaoDePagamentoCompleto(tenant, true, true, '', 1, 999), countCondicaoDePagamento);
    fetchData(() => GetNaturezaCompleto(tenant, true, true, '', 1, 999), countNatureza);
});
</script>
