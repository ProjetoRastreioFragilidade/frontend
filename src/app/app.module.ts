import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { providers } from './app.module.providers';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routing';
import { RegisterPatientComponent } from './register-patient/register-patient.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterPatientComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [...providers],
  bootstrap: [AppComponent]
})
export class AppModule { }
