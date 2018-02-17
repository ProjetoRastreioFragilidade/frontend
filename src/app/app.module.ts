import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { providers } from './app.module.providers';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routing';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptor } from './app.http.interceptor';
import { AuthenticationService } from './_services/index';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RegisterHealthCenterComponent } from './register-health-center/register-health-center.component';
import { EdmontonAnalyzeComponent } from './edmonton-analyze/edmonton-analyze.component';
import { SubjectiveAnalyzeComponent } from './subjective-analyze/subjective-analyze.component';
import { FinalComponent } from './final/final.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterPatientComponent,
    RegisterHealthCenterComponent,
    EdmontonAnalyzeComponent,
    SubjectiveAnalyzeComponent,
    FinalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    routing
  ],
  providers: [...providers,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
    AuthenticationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
