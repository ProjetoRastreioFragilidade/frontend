export interface Report {
    geral: {
        subjetiva: Subjetiva;
        edmonton: Edmonton;
    }
    sexo: {
        subjetiva:  {
            M: Subjetiva;
            F: Subjetiva;
        }
        edmonton: {
            M: Edmonton;
            F: Edmonton;
        }
    }
    idade: {
        subjetiva: {
            '00-69': Subjetiva;
            '70-79': Subjetiva;
            '80+': Subjetiva;
        }
        edmonton: {
            '00-69': Edmonton;
            '70-79': Edmonton;
            '80+': Edmonton;
        }
    }
    
}

export interface Subjetiva {
    N: number;
    P: number;
    F: number;
}

export interface Edmonton {
    N: number;
    V: number;
    L: number;
    M: number;
    S: number;
}