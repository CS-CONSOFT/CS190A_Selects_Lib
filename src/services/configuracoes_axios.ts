//URLS
const URLBase = import.meta.env.VITE_API_URL;
const newURLBase = import.meta.env.VITE_URL_BASESP;
const URL_PDVAPI = import.meta.env.VITE_URL_BASEOS + '/cs_At_40_LogicoService/rest/CS_PDV_API/';
//SERVIÇOS
const serviceBs101 = import.meta.env.VITE_URL_APIBS101;
const serviceSt102 = import.meta.env.VITE_URL_APIST102;
const serviceSy103 = import.meta.env.VITE_URL_APISY103;

export { URLBase, newURLBase, URL_PDVAPI, serviceBs101, serviceSt102, serviceSy103 };
