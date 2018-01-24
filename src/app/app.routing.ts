import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { LoginComponent } from './login/login.component';

const APP_ROUTES: Routes = [
    { path: 'registra-paciente', component: RegisterPatientComponent},
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);