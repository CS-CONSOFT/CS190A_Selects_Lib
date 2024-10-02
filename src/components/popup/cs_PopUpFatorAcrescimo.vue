<template>
    <v-dialog v-model="dialogFator" max-width="700">
        <v-card>
            <v-card-title class="pa-4 bg-lightprimary">
                <span class="text-h5">Calcular fator de acréscimo</span>
            </v-card-title>
            <v-card-title>
                <v-row class="my-0">
                    <v-col cols="6" class="pb-0">
                        <cs_InputTexto
                            v-model="taxaDeJuros"
                            Prm_etiqueta="Juros Mês (%)"
                            :Prm_limpavel="false"
                            :Prm_isObrigatorio="false"
                        />
                    </v-col>
                    <v-col cols="6" class="pb-0">
                        <cs_InputTexto
                            v-model="numeroDeParcelas"
                            Prm_etiqueta="Quantidade de Parcelas"
                            :Prm_limpavel="false"
                            :Prm_isObrigatorio="false"
                        />
                    </v-col>
                </v-row>
                <v-row class="my-0">
                    <v-col cols="12" class="py-0">
                        <cs_InputTexto
                            v-model="fatorCalculado"
                            Prm_etiqueta="Fator"
                            :Prm_limpavel="false"
                            :Prm_isObrigatorio="false"
                            readonly
                        />
                    </v-col>
                </v-row>
                <v-row class="border rounded-md pa-1 ma-1">
                    <div>
                        <span class="text-h5">Coeficiente de Financiamento</span>
                    </div>
                    <div class="mt-3">
                        <span>
                            O coeficiente de financiamento é um fator que ao ser multiplicado pelo valor<br />
                            a ser financiado, irá nos fornecer o valor de cada prestação. O cálculo do coe <br />
                            ficiente de financiamento tem como variáveis tanto a taxa de juros, quanto o<br />
                            número de períodos da operação. Ele é calculado através da seguinte fórmula:
                        </span>
                    </div>
                    <div class="pa-4">
                        <img src="@/assets/images/cs/CF.jpg" alt="image" width="300" />
                    </div>
                    <div class="mt-2">
                        <span>
                            A variável <u><strong>CF</strong></u> representa o próprio
                            <u> <strong>coeficiente de financiamento</strong></u>
                            , já as variáve<br />is i e n representam respectivamente a taxa de juros cobrada pelo financia<br />mento e o
                            período ou número de parcelas mensais, já que quase invariavel<br />mente as prestações são mensais. Assim como
                            nos cálculos envolvendo juros<br />
                            simples e juros compostos, no caso do cálculo de prestações tanto a taxa de <br />financiamento, quanto o
                            período, devem estar na mesma unidade
                        </span>
                    </div>
                </v-row>
            </v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" variant="flat" @click="closeDialogFator">Cancelar</v-btn>
                <v-btn color="greensuccess" variant="flat" @click="calcularCoeficienteFinanciamento(taxaDeJuros, numeroDeParcelas)"
                    >Calcular</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import cs_InputTexto from '../../components/campos/cs_InputTexto.vue';

const dialogFator = ref(false);
const taxaDeJuros = ref<number>(0);
const numeroDeParcelas = ref<number>(0);
const fatorCalculado = ref<number>(0);

function openDialogFator() {
    dialogFator.value = true;
}

function closeDialogFator() {
    dialogFator.value = false;
}

function calcularCoeficienteFinanciamento(i: number, n: number): number {
    const numerador = i;
    const denominador = 1 - 1 / Math.pow(1 + i, n);
    const coeficiente = numerador / denominador;

    const coeficienteLimitado = parseFloat(coeficiente.toFixed(8));

    fatorCalculado.value = coeficienteLimitado;
    return coeficienteLimitado;
}

defineExpose({
    openDialogFator,
    closeDialogFator
});
</script>
