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

import { Question1Component } from './subjective-analyze/question-1/question-1.component';
import { Question2Component } from './subjective-analyze/question-2/question-2.component';
import { Question3Component } from './subjective-analyze/question-3/question-3.component';
import { Question4Component } from './subjective-analyze/question-4/question-4.component';
import { Question5Component } from './subjective-analyze/question-5/question-5.component';
import { Question6Component } from './subjective-analyze/question-6/question-6.component';

import { MoreInfoComponent } from './edmonton-analyze/more-info/more-info.component';
import { QuestionEdmonton1Component } from './edmonton-analyze/question-edmonton-1/question-edmonton-1.component';
import { QuestionEdmonton2aComponent } from './edmonton-analyze/question-edmonton-2a/question-edmonton-2a.component';
import { QuestionEdmonton2bComponent } from './edmonton-analyze/question-edmonton-2b/question-edmonton-2b.component';
import { QuestionEdmonton3Component } from './edmonton-analyze/question-edmonton-3/question-edmonton-3.component';
import { QuestionEdmonton4Component } from './edmonton-analyze/question-edmonton-4/question-edmonton-4.component';
import { QuestionEdmonton5aComponent } from './edmonton-analyze/question-edmonton-5a/question-edmonton-5a.component';
import { QuestionEdmonton5bComponent } from './edmonton-analyze/question-edmonton-5b/question-edmonton-5b.component';
import { QuestionEdmonton6Component } from './edmonton-analyze/question-edmonton-6/question-edmonton-6.component';
import { QuestionEdmonton7Component } from './edmonton-analyze/question-edmonton-7/question-edmonton-7.component';
import { QuestionEdmonton8Component } from './edmonton-analyze/question-edmonton-8/question-edmonton-8.component';
import { QuestionEdmonton9Component } from './edmonton-analyze/question-edmonton-9/question-edmonton-9.component';
import { FinalEdmontonComponent } from './final-edmonton/final-edmonton.component';

import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { BlockUIModule } from 'ng-block-ui';
import { SimpleTimer } from 'ng2-simple-timer';
import { TextMaskModule } from 'angular2-text-mask';
import { TimerComponent } from './_shared/timer/timer.component';
import { ReportComponent } from './report/report.component';
import { LoaderComponent } from './_utils/loader/loader.component';

import { EdmontonPipe, SubjetivaPipe } from './_pipes';

// import { PdfmakeService } from 'ng-pdf-make';
// import { PdfmakeModule } from 'ng-pdf-make';

@NgModule({
  imports: [
    // retirar essa linha para build em prod
    BlockUIModule.forRoot(),
    BlockUIModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    routing,
    Angular2FontawesomeModule,
    TextMaskModule,
    // PdfmakeModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterPatientComponent,
    RegisterHealthCenterComponent,
    EdmontonAnalyzeComponent,
    SubjectiveAnalyzeComponent,
    FinalComponent,
    Question1Component,
    Question2Component,
    Question3Component,
    Question4Component,
    Question5Component,
    Question6Component,
    MoreInfoComponent,
    QuestionEdmonton1Component,
    QuestionEdmonton2aComponent,
    QuestionEdmonton2bComponent,
    QuestionEdmonton3Component,
    QuestionEdmonton4Component,
    QuestionEdmonton5aComponent,
    QuestionEdmonton5bComponent,
    QuestionEdmonton6Component,
    QuestionEdmonton7Component,
    QuestionEdmonton8Component,
    QuestionEdmonton9Component,
    FinalEdmontonComponent,
    TimerComponent,
    ReportComponent,
    LoaderComponent,
    EdmontonPipe,
    SubjetivaPipe
  ],
  providers: [...providers,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
    AuthenticationService,
    SimpleTimer,
    // PdfmakeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
