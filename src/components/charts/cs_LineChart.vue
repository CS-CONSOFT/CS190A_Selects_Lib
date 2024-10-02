<template>
    <v-card elevation="10">
        <span class="lstick"></span>
        <v-card-text>
            <div class="d-sm-flex align-center">
                <div>
                    <p class="text-h5 title mb-1">Gráfico de Linhas - Totalização</p>
                </div>
                <div class="ml-auto">
                    <div class="d-flex align-center mt-sm-0 mt-3">
                        <div class="d-flex align-baseline">
                            <v-icon color="primary" size="sm">mdi-circle</v-icon>
                            <div class="ml-2">Tabelas</div>
                        </div>
                        <div class="d-flex align-baseline ml-2">
                            <v-btn density="compact" icon="mdi-download" @click="downloadChart"></v-btn>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-5">
                <canvas ref="lineChart" :height="300" :width="600" id="myChart"></canvas>
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, Ref, computed } from 'vue';
import {
    Chart,
    LineController,
    LineElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    PointElement,
    ChartOptions,
    Filler
} from 'chart.js';
import { useAuthStore } from '@/stores/auth';
import { getPrimary, getLightPrimary } from '@/utils/UpdateColors';
Chart.register(LineController, LineElement, CategoryScale, LinearScale, Filler, Title, Tooltip, Legend, PointElement);

// Import de API's
import { GetCentroDeCustoCompleto } from '@/services/basico/bb005_centrodecusto';
import { GetAgenteCobrador } from '@/services/basico/bb006_agentecobrador';
import { GetResponsavelCompleto } from '@/services/basico/bb007_responsavel';
import { GetFormasDePagamentoCompleto } from '@/services/basico/bb026_formadepagamento';
import { GetCondicaoDePagamentoCompleto } from '@/services/basico/bb008_condicaodepagamento';
import { GetNaturezaCompleto } from '@/services/basico/bb025_natureza';

// Declaração de variáveis
const lineChart = ref<HTMLCanvasElement | null>(null);
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

const downloadChart = () => {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;

    if (canvas) {
        // Converte o canvas em uma imagem (formato PNG)
        const url = canvas.toDataURL('image/png');

        // Cria um elemento link para download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'grafico.png';

        // Aciona o download
        a.click();
    }
};

// Dados do gráfico
const chartData = computed(() => ({
    labels: ['Inicio', 'Fim'],
    datasets: [
        {
            label: 'Centro de Custo',
            backgroundColor: getPrimary.value,
            borderColor: getLightPrimary.value,
            fill: true,
            tension: 0.4,
            data: [0, 0]
        },
        {
            label: 'Agente Cobrador',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: true,
            tension: 0.4,
            data: [0, 0]
        },
        {
            label: 'Responsável',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: true,
            tension: 0.4,
            data: [0, 0]
        },
        {
            label: 'Forma de Pagamento',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            fill: true,
            tension: 0.4,
            data: [0, 0]
        },
        {
            label: 'Condição de Pagamento',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            fill: true,
            tension: 0.4,
            data: [0, 0]
        },
        {
            label: 'Natureza da Operação',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            fill: true,
            tension: 0.4,
            data: [0, 0]
        }
    ]
}));

const chartOptions: ChartOptions<'line'> = {
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
        delay: (context) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default' && !delayed.value) {
                delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
        }
    },
    scales: {
        x: {
            display: true,
            title: {
                display: true,
                text: 'Tabelas'
            }
        },
        y: {
            display: true,
            title: {
                display: true,
                text: 'Valores'
            },
            min: 0
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

// Função para renderizar o gráfico de linhas
const renderChart = () => {
    if (lineChart.value) {
        const ctx = lineChart.value.getContext('2d');
        if (ctx) {
            if (chartInstance) {
                chartInstance.destroy();
            }
            chartInstance = new Chart(ctx, {
                type: 'line',
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
        if (chartInstance && chartData.value.datasets[index]) {
            // Atualiza o dataset com o novo valor observado
            chartData.value.datasets[index].data = [0, newVal];
            chartInstance.update(); // Atualiza o gráfico
        }
    });
});

// Chamadas de API e inicialização do gráfico
onMounted(() => {
    renderChart();

    // Chamadas das funções de API usando o fetchData genérico
    fetchData(() => GetCentroDeCustoCompleto(tenant, true, true, '', 1, 999), countCentroDeCusto);
    fetchData(() => GetAgenteCobrador(tenant, true, true, '', 1, 999), countAgenteCobrador);
    fetchData(() => GetResponsavelCompleto(tenant, true, true, '', 1, 999), countResponsavel);
    fetchData(() => GetFormasDePagamentoCompleto(tenant, true, true, '', 1, 999), countFormaDePagamento);
    fetchData(() => GetCondicaoDePagamentoCompleto(tenant, true, true, '', 1, 999), countCondicaoDePagamento);
    fetchData(() => GetNaturezaCompleto(tenant, true, true, '', 1, 999), countNatureza);
});
</script>
