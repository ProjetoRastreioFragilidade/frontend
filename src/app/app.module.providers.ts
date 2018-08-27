import { Provider } from '@angular/core';
import {
    AuthenticationService, 
    PostoService, 
    PatientService, 
    TestService, 
    UserService,
    SharedService,
    RouterService,
    UploadService,
    ReportService
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
    UserService,
    SharedService,
    RouterService,
    UploadService,
    ReportService
];