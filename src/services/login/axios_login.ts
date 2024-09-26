import axios from 'axios';
import { URL_PDVAPI } from '../configuracoes_axios';

interface Registro {
    Dominio: string;
    Usuario: string;
    Senha: string;
}

function LoginGeral(reg: Registro): Promise<any> {
    const config = {
        method: 'post',
        url: `${URL_PDVAPI}LoginGeral`,
        data: reg
    };

    return axios(config);
}

export { LoginGeral };
