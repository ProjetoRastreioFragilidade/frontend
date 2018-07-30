export interface Test {
    id: number,
    data_inicio: string,
    data_fim: string,
    tipo: string
}

export interface Subjective {
    id?: number;
    data_inicio?: string;
    data_fim?: string;
    fragilidade?: string;
    fatores?: string;
    q1_perdeu_peso?: number;
    q1_perdeu_peso_kg?: number;
    q2_ativ_fisica?: number;
    q3_red_forca?: number;
    q4_red_caminhada?: number;
    q5_fadiga?: number;
    q6_desanimo?: number;
    paciente?: number;
    usuario?: number;
    usuario_edit?: string;
    score?: number;
}

export interface Edmonton {
    id?: number;
    data_inicio?: string;
    data_fim?: string;
    fragilidade?: string;
    fatores?: string;

    q1_cognicao?: number;
    q1_foto_relogio?: any;
    q2_estado_saude_A?: number;
    q2_estado_saude_B?: number;
    q3_ind_func?: any;
    q4_sup_social?: number;
    q5_medicamento_A?: number;
    q5_medicamento_B?: number;
    q6_nutricao?: number;
    q7_humor?: number;
    q8_continencia?: number;
    q9_desemp_func?: number;
    q9_desemp_func_tempo?: number;
    paciente?: number;
    usuario?: number;
    usuario_edit?: string;
    score?: number;
}
