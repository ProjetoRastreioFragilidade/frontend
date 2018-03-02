import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { SharedService } from '@services/shared.service';

@Injectable()
export class RouterService {
    constructor(router: Router, sharedService: SharedService) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                sharedService.startBlockUI();
            } else if (event instanceof NavigationEnd) {
                sharedService.stopBlockUI();
            } else if (event instanceof NavigationError) {
                sharedService.stopBlockUI();
            } else if (event instanceof NavigationCancel) {
                sharedService.stopBlockUI();
            }
        });
    }
}
