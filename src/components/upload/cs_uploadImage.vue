<!--
  Componente genérico para envio de imagem.
  
  Este componente pode ser utilizado para upload de imagens em diferentes contextos.
  Ele possui um slot nomeado <slot name="image-options"></slot> onde o conteúdo pode ser
  passado de forma variável, permitindo customizar as opções de seleção de tipo de imagem
  ou outros elementos conforme necessário.

  Eventos emitidos:
  - close-dialog: Emitido quando o usuário clica no botão de cancelar.
  - on-image-upload: Emitido após o click para upload de uma imagem, podendo passar a função desejada ao realizar esse click
-->

<template>
    <v-card>
        <v-card-title class="text-h5 pa-4 mb-5 bg-success"> Upload de Imagem </v-card-title>

        <v-card-text>
            <slot name="image-options"></slot>

            <v-row class="px-7">
                <v-file-input
                    v-model:file="selectedImage"
                    label="Escolha uma imagem"
                    @change="_handleFileChange"
                    accept="image/*"
                ></v-file-input>
            </v-row>
        </v-card-text>

        <!-- Exibe mensagem de erro caso ocorra -->
        <span v-if="errorMessage" class="text-red">{{ errorMessage }}</span>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn v-if="!isLoading" color="blue darken-1" text @click="closeDialogUploadImage">Cancelar</v-btn>
            <v-btn v-if="!isLoading" color="blue darken-1" text @click="uploadImage">Enviar</v-btn>
            <v-progress-circular v-if="isLoading" indeterminate model-value="20"></v-progress-circular>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { helperHandleFileChange } from '../../services/cdn/cs_UploadImgHelper';

const selectedImage = ref<any>(null);
const errorMessage = ref<string | null>(null);
const isLoading = ref(false);

enum EmitEvents {
    CLOSE_DIALOG = 'close-dialog',
    ON_IMAGE_UPLOAD = 'on-image-upload'
}
const emit = defineEmits([EmitEvents.CLOSE_DIALOG, EmitEvents.ON_IMAGE_UPLOAD]);

function closeDialogUploadImage() {
    emit(EmitEvents.CLOSE_DIALOG);
}

//REFATORANDO HANDLE FILE CHANGE
function _handleFileChange(event: Event) {
    try {
        // Função de tratamento do arquivo
        selectedImage.value = helperHandleFileChange(event);
        errorMessage.value = null; // Limpa a mensagem de erro ao selecionar uma nova imagem
    } catch (error) {
        errorMessage.value = 'Erro ao selecionar a imagem.'; // Define a mensagem de erro
    }
}

async function uploadImage() {
    isLoading.value = true;
    if (!selectedImage.value) {
        errorMessage.value = 'Por favor, selecione uma imagem antes de enviar.';
        isLoading.value = false;
        return;
    }
    emit(EmitEvents.ON_IMAGE_UPLOAD, selectedImage.value);
}
</script>
