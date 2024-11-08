export interface CNPJ {
    cnpj: string;
    identificador_matriz_filial: number;
    descricao_matriz_filial: string;
    razao_social: string;
    nome_fantasia: string;
    situacao_cadastral: number;
    descricao_situacao_cadastral: string;
    data_situacao_cadastral: string;
    motivo_situacao_cadastral: number;
    nome_cidade_exterior?: any;
    codigo_natureza_juridica: number;
    data_inicio_atividade: string;
    cnae_fiscal: number;
    cnae_fiscal_descricao: string;
    descricao_tipo_de_logradouro: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: number;
    uf: string;
    codigo_municipio: number;
    municipio: string;
    ddd_telefone_1: string;
    ddd_telefone_2?: any;
    ddd_fax?: any;
    qualificacao_do_responsavel: number;
    capital_social: number;
    porte: number;
    descricao_porte: string;
    opcao_pelo_simples: boolean;
    data_opcao_pelo_simples?: any;
    data_exclusao_do_simples?: any;
    opcao_pelo_mei: boolean;
    situacao_especial?: any;
    data_situacao_especial?: any;
    cnaes_secundarios: Cnaes_secundarios[];
    qsa: Qsa[];
}

export interface Cnaes_secundarios {
    codigo: number;
    descricao: string;
}

export interface Qsa {
    identificador_de_socio: number;
    nome_socio: string;
    cnpj_cpf_do_socio: string;
    codigo_qualificacao_socio: number;
    percentual_capital_social: number;
    data_entrada_sociedade: string;
    cpf_representante_legal?: any;
    nome_representante_legal?: any;
    codigo_qualificacao_representante_legal?: any;
}

export interface CnpjErrorsType {
    name: string;
    message: string;
    type: string;
    errors: Errors[];
}

export interface Errors {
    message: string;
}
