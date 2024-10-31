// Importa o serviço para enviar o arquivo para o CDN e o tipo de resposta esperado
import PutCsObject, { type PutCsObjectResponse } from '../../services/cdn/cdn';

// Importa o tipo para o token genérico e a função para obter o token
import GetTokenGenerico from '../token/token';

// Importa os rótulos dos tokens genéricos
import { ETokenGenericoLabel } from '../../utils/EnumTokenGenerico';
import { getUserFromLocalStorage } from '../../utils/getUserStorage';

/**
 * Função para lidar com a mudança do arquivo selecionado.
 * @param event - Evento do input de arquivo
 * @returns O arquivo selecionado
 * @throws Se nenhum arquivo for selecionado ou o formato for inválido
 */
export function helperHandleFileChange(event: Event): File {
    // Obtém o input de arquivo a partir do evento
    const input = event.target as HTMLInputElement;
    let file: File;

    // Verifica se há arquivos selecionados
    if (input.files && input.files.length > 0) {
        file = input.files[0];

        // Verifica o formato da imagem selecionada
        const allowedFormats = ['image/jpeg', 'image/png'];
        if (!allowedFormats.includes(file.type)) {
            throw new Error('Formato de imagem não suportado. Selecione uma imagem JPEG ou PNG.');
        }
    } else {
        throw new Error('Nenhuma imagem selecionada.');
    }
    return file;
}

/**
 * Função para lidar com o upload da imagem selecionada.
 * @param tenant - ID do locatário
 * @param selectedImg - Arquivo de imagem selecionado
 * @param token - Rótulo do token genérico para autenticação
 * @returns Resposta da API de upload
 * @throws Se ocorrer um erro durante a leitura do arquivo ou o upload
 */
export async function helperHandleUploadImg(selectedImg: File, token: ETokenGenericoLabel): Promise<PutCsObjectResponse> {
    const user = getUserFromLocalStorage();
    const tenant = user?.TenantId;

    return new Promise((resolve, reject) => {
        // Cria um FileReader para ler o conteúdo do arquivo
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedImg);
        reader.onload = async () => {
            try {
                // Converte o ArrayBuffer em Blob
                const blob = new Blob([reader.result as ArrayBuffer], { type: selectedImg.type });

                // Converte o Blob em Uint8Array
                const uint8Array = new Uint8Array(await blob.arrayBuffer());

                // Converte o Uint8Array para uma string Base64
                const binaryString = uint8ArrayToBase64(uint8Array);

                // Obtém o token necessário para o upload
                const resToken = await GetTokenGenerico(tenant, token);

                // Chama o serviço para enviar o arquivo para o CDN
                let response = await PutCsObject(
                    resToken.data.AppKey_aa030_awsregion,
                    resToken.data.Token_aa030_awsAccessKeyID,
                    resToken.data.aa030_awsSecretAccessKe,
                    resToken.data.aa030_aws_bucket,
                    selectedImg.name,
                    blob
                );

                // Anexa o binário em Base64 à resposta
                const res = response.data;
                res.binary = binaryString; // Adiciona a string Base64 da imagem à resposta

                resolve(res); // Resolve a promise com a resposta da API
            } catch (err) {
                reject(new Error(err as string)); // Rejeita a promise com o erro
            }
        };

        reader.onerror = (error) => {
            reject(new Error('Erro ao ler o arquivo de imagem.')); // Rejeita a promise com o erro de leitura
        };
    });
}

// Função para converter Uint8Array em Base64
function uint8ArrayToBase64(uint8Array: any) {
    // Converte o Uint8Array em uma string binária
    let binaryString = '';
    for (let i = 0; i < uint8Array.length; i++) {
        binaryString += String.fromCharCode(uint8Array[i]);
    }
    // Codifica a string binária em Base64
    return window.btoa(binaryString);
}

/**
 * Função para converter o conteúdo do arquivo em Blob.
 * @param reader - FileReader que contém o resultado da leitura
 * @param selectedImg - Arquivo de imagem selecionado
 * @returns Um Blob representando o arquivo de imagem
 */
export async function getBlobFromImage(reader: FileReader, selectedImg: File) {
    const fileBinaryData = reader.result as ArrayBuffer;
    return new Blob([fileBinaryData], { type: selectedImg.type });
}
