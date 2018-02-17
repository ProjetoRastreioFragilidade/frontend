import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/index';

import { FinalComponent } from 'app/final/final.component';
import { SubjectiveAnalyzeComponent } from 'app/subjective-analyze/subjective-analyze.component';
import { EdmontonAnalyzeComponent } from 'app/edmonton-analyze/edmonton-analyze.component';
import { RegisterHealthCenterComponent } from 'app/register-health-center/register-health-center.component';
import { RegisterPatientComponent } from 'app/register-patient/register-patient.component';
import { LoginComponent } from 'app/login/login.component';
import { HomeComponent } from 'app/home/home.component';

const APP_ROUTES: Routes = [
    { path: 'final', component: FinalComponent, canActivate: [AuthGuard]},
    { path: 'subjetiva', component: SubjectiveAnalyzeComponent, canActivate: [AuthGuard]},
    { path: 'edmonton', component: EdmontonAnalyzeComponent, canActivate: [AuthGuard]},
    { path: 'registra-posto', component: RegisterHealthCenterComponent, canActivate: [AuthGuard]},
    { path: 'registra-paciente', component: RegisterPatientComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard]},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);