import { Provider } from '@angular/core';
import {
    AuthenticationService, PostoService, PatientService
} from '@services';

import {
    AuthGuard
} from '@guards';

export const providers: Provider[] = [
    AuthenticationService,
    AuthGuard,
    PostoService,
    PatientService
];