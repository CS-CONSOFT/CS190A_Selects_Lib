import { URLBase } from '../../services/configuracoes_axios';
import axios from 'axios';
import type { AxiosResponse } from 'axios';

export interface PutCsObjectResponse {
    Out_Success: boolean;
    Out_Message: string;
    Out_Path: string;
    binary: any;
}

function PutCsObject(
    AWS_Region: string,
    AWS_AccessKeyId: string,
    AWS_SecretAccessKey: string,
    AWS_Bucket: string,
    Filename: string,
    File_BinaryData: Blob
): Promise<AxiosResponse<PutCsObjectResponse>> {
    return axios.put(`${URLBase}/CSR_LB900_CDN_API_IS/rest/CSCDN_WS/CS_Object_Put`, File_BinaryData, {
        headers: {
            AWS_Region: AWS_Region,
            AWS_AccessKeyId: AWS_AccessKeyId,
            AWS_SecretAccessKey: AWS_SecretAccessKey,
            AWS_Bucket: AWS_Bucket,
            Filename: Filename,
            'Content-Type': 'application/octet-stream'
        }
    });
}

export default PutCsObject;
