import { Provider } from '@angular/core';
import {
    AuthenticationService
} from '@services';

import {
    AuthGuard
} from '@guards';

export const providers: Provider[] = [
    AuthenticationService,
    AuthGuard
];