<template>
    <v-card elevation="10">
        <span class="lstick"></span>
        <v-card-text>
            <div class="d-sm-flex align-center">
                <div>
                    <p class="text-h5 title mb-1">Tabelas de Totalização - Ativos e Inativos</p>
                </div>
                <div class="ml-auto">
                    <div class="d-flex align-center mt-sm-0 mt-3">
                        <div class="d-flex align-baseline">
                            <v-icon color="primary" size="sm">mdi-circle</v-icon>
                            <div class="ml-2">Ativos</div>
                        </div>
                        <div class="d-flex align-baseline ml-2">
                            <v-icon color="lightprimary" size="sm">mdi-circle</v-icon>
                            <div class="ml-2">Inativos</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-5">
                <canvas ref="barChart" class="chartBar"></canvas>
            </div>
        </v-card-text>
    </v-card>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, Ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ChartOptions } from 'chart.js';
import { getPrimary, getLightPrimary } from '@/utils/UpdateColors';
// Registro dos componentes necessários do Chart.js
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
// Import de API's
import { GetCentroDeCustoCompleto } from '@/services/basico/bb005_centrodecusto';
import { GetAgenteCobrador } from '@/services/basico/bb006_agentecobrador';
import { GetResponsavelCompleto } from '@/services/basico/bb007_responsavel';
import { GetFormasDePagamentoCompleto } from '@/services/basico/bb026_formadepagamento';
import { GetCondicaoDePagamentoCompleto } from '@/services/basico/bb008_condicaodepagamento';
import { GetNaturezaCompleto } from '@/services/basico/bb025_natureza';

// Declaração de variáveis
const barChart = ref<HTMLCanvasElement | null>(null);
//count ativos
const countCentroDeCusto = ref<number>(0);
const countAgenteCobrador = ref<number>(0);
const countResponsavel = ref<number>(0);
const countFormaDePagamento = ref<number>(0);
const countCondicaoDePagamento = ref<number>(0);
const countNatureza = ref<number>(0);
//count inativos
const countCentroDeCustoInativos = ref<number>(0);
const countAgenteCobradorInativos = ref<number>(0);
const countResponsavelInativos = ref<number>(0);
const countFormaDePagamentoInativos = ref<number>(0);
const countCondicaoDePagamentoInativos = ref<number>(0);
const countNaturezaInativos = ref<number>(0);
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
            label: 'Ativos',
            backgroundColor: getPrimary.value,
            borderColor: getPrimary.value,
            borderWidth: 1,
            data: [0, 0, 0, 0, 0, 0]
        },
        {
            label: 'Inativos',
            backgroundColor: getLightPrimary.value,
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
        // Atualizar as cores do dataset de Ativos
        chartInstance.data.datasets[0].backgroundColor = getPrimary.value;
        chartInstance.data.datasets[0].borderColor = getPrimary.value;

        // Atualizar as cores do dataset de Inativos
        chartInstance.data.datasets[1].backgroundColor = getLightPrimary.value;
        chartInstance.data.datasets[1].borderColor = getLightPrimary.value;

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

const variablesToWatchInativos = [
    { ref: countCentroDeCustoInativos, index: 0 },
    { ref: countAgenteCobradorInativos, index: 1 },
    { ref: countResponsavelInativos, index: 2 },
    { ref: countFormaDePagamentoInativos, index: 3 },
    { ref: countCondicaoDePagamentoInativos, index: 4 },
    { ref: countNaturezaInativos, index: 5 }
];

// Watch dinâmico para atualizar os dados no gráfico
variablesToWatch.forEach(({ ref, index }) => {
    watch(ref, (newVal) => {
        if (chartInstance && chartData.value.datasets[0]) {
            chartData.value.datasets[0].data[index] = newVal; // Atualiza os dados de Ativos
            chartInstance.update();
        }
    });
});

variablesToWatchInativos.forEach(({ ref, index }) => {
    watch(ref, (newVal) => {
        if (chartInstance && chartData.value.datasets[1]) {
            chartData.value.datasets[1].data[index] = newVal; // Atualiza os dados de Inativos
            chartInstance.update();
        }
    });
});

// Chamadas de API e inicialização do gráfico
onMounted(() => {
    renderChart();

    // Chamadas das funções de API usando o fetchData genérico para trazer os ativos
    fetchData(() => GetCentroDeCustoCompleto(tenant, true, true, '', 1, 999), countCentroDeCusto);
    fetchData(() => GetAgenteCobrador(tenant, true, true, '', 1, 999), countAgenteCobrador);
    fetchData(() => GetResponsavelCompleto(tenant, true, true, '', 1, 999), countResponsavel);
    fetchData(() => GetFormasDePagamentoCompleto(tenant, true, true, '', 1, 999), countFormaDePagamento);
    fetchData(() => GetCondicaoDePagamentoCompleto(tenant, true, true, '', 1, 999), countCondicaoDePagamento);
    fetchData(() => GetNaturezaCompleto(tenant, true, true, '', 1, 999), countNatureza);
    // Chamadas das funções de API usando o fetchData genérico para trazer os inativos
    fetchData(() => GetCentroDeCustoCompleto(tenant, false, true, '', 1, 999), countCentroDeCustoInativos);
    fetchData(() => GetAgenteCobrador(tenant, false, true, '', 1, 999), countAgenteCobradorInativos);
    fetchData(() => GetResponsavelCompleto(tenant, false, true, '', 1, 999), countResponsavelInativos);
    fetchData(() => GetFormasDePagamentoCompleto(tenant, false, true, '', 1, 999), countFormaDePagamentoInativos);
    fetchData(() => GetCondicaoDePagamentoCompleto(tenant, false, true, '', 1, 999), countCondicaoDePagamentoInativos);
    fetchData(() => GetNaturezaCompleto(tenant, false, true, '', 1, 999), countNaturezaInativos);
});
</script>
<style scoped>
.chartBar {
    width: 5%;
    max-height: 50vh;
    height: 20%;
}
</style>
