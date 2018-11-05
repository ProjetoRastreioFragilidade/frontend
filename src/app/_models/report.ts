export interface Report {
    geral: {
        subjetiva: ReportSubjetiva;
        edmonton: ReportEdmonton;
    };
    sexo: {
        subjetiva:  {
            M: ReportSubjetiva;
            F: ReportSubjetiva;
        }
        edmonton: {
            M: ReportEdmonton;
            F: ReportEdmonton;
        }
    };
    idade: {
        subjetiva: {
            '00-69': ReportSubjetiva;
            '70-79': ReportSubjetiva;
            '80+': ReportSubjetiva;
        }
        edmonton: {
            '00-69': ReportEdmonton;
            '70-79': ReportEdmonton;
            '80+': ReportEdmonton;
        }
    };
}

export interface ReportSubjetiva {
    N: number;
    P: number;
    F: number;
}

export interface ReportEdmonton {
    N: number;
    V: number;
    L: number;
    M: number;
    S: number;
}


export interface PatientReport {
    edm: string;
    n_sus: string;
    nome: string;
    sub: string;
}
