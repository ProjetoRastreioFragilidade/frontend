import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'edmonton' })
export class EdmontonPipe implements PipeTransform {
    transform(value: string) {
        if (value === '') {
            return '-';
        } else if (value === 'N') {
            return 'Não apresenta fragilidade';
        } else if (value === 'V') {
            return  'Aparentemente vulnerável';
        } else if (value === 'L') {
            return 'Fragilidade leve';
        } else if (value === 'M') {
            return 'Fragilidade moderada';
        } else if (value === 'S') {
            return 'Fragilidade severa';
        } else {
            return value;
        }
    }
}
