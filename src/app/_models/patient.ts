export interface Patient {
    id?: number;
    nome: string; 
    nro_sus: string;
    data_nascimento: string;
    end_bairro: string;
    end_rua: string;
    end_numero: number;
    cep: string;
    posto: number;
}

// TODO -> como que eu sei o posto que vai ser salvo?????
// TODO -> arrumar no back 'bairo'