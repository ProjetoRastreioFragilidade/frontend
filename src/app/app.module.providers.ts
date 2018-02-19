import { Provider } from '@angular/core';
import {
    AuthenticationService, PostoService, PatientService, TestService, UserService
} from '@services';

import {
    AuthGuard
} from '@guards';

export const providers: Provider[] = [
    AuthenticationService,
    AuthGuard,
    PostoService,
    PatientService,
    TestService,
    UserService
];