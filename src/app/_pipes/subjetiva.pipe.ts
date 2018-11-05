import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'subjetiva' })
export class SubjetivaPipe implements PipeTransform {
    transform(value: string) {
        if (value === '') {
            return '-';
        } else if (value === 'N') {
            return 'Não Frágil';
        } else if (value === 'P') {
            return  'Pré Frágil';
        } else if (value === 'F') {
            return 'Frágil';
        } else {
            return value;
        }
    }
}
