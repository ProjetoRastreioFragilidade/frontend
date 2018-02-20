import { Injectable } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Injectable()
export class SharedService {
    @BlockUI() blockUI: NgBlockUI;

    public startBlockUI() {
        this.blockUI.start('Carregando...'); // Start blocking
    }
    public stopBlockUI() {
        this.blockUI.stop(); // Stop blocking
    }
}
