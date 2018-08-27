import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, PatientService, TestService, SharedService } from '@services';
import { Patient, Test } from '@models';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public mask = [/[0-9]/, /\d/, /\d/, '.', /[0-9]/, /\d/, /\d/, /\d/, '.', /[0-9]/, /\d/, /\d/, /\d/, '.',  /[0-9]/, /\d/, /\d/, /\d/ ];
  
  public susNumber: string;
  
  public tests: Test[];
  public patient: Patient;

  public isEmpty = false;
  public errorMessage: string;


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private patientService: PatientService,
    private testService: TestService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.tests = [];
    this.susNumber = localStorage.getItem('nro_sus');
    if(this.susNumber) {
      this.searchPatient();
    }
  }
  public generateReport() {
    this.router.navigate(['/relatorio']);
  }
  public createPatient() {
    this.router.navigate(['/registra-paciente']); 
  }
  public createHealthCenter() {
    this.router.navigate(['/registra-posto']); 
  }

  public newEdmonton() { //passa ir do paciente
    this.router.navigate(['/edmonton', this.patient.id]); 
  }

  public newSubjective() { //passa ir do paciente
    this.router.navigate(['/subjetiva', this.patient.id]); 
  }
  
  public seeResults(testId: number, testTipo: string) {
    if (testTipo === 'e') {
      this.router.navigate(['/final-edmonton', testId]); 
    } else {
      this.router.navigate(['/final', testId]); 
    }
  }

  public logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  
  public searchPatient() {
    this.susNumber = this.susNumber.replace(/\D+/g, '');
    this.tests = [];
    this.isEmpty = false;
    this.errorMessage = '';
    if (this.susNumber.length < 15) {
      this.errorMessage = "Número SUS inválido!";
      return;
    } else {
      
      this.sharedService.startBlockUI();
      this.patientService.findBySUSNumber(this.susNumber).subscribe((patient: Patient) => {
        this.patient = patient;
        this.patient.nro_sus = this.maskString();
        this.testService.findByPatientId(this.patient.id).subscribe((tests: Test[]) => {
          this.tests = tests;
          if (this.tests.length === 0) {
            this.isEmpty = true;
          }
          localStorage.setItem('nro_sus', this.susNumber);
          this.tests.forEach(test => {
            test.data_fim = moment(test.data_fim).format('DD/MM/YYYY - HH:mm');
            test.data_inicio = moment(test.data_inicio).format('DD/MM/YYYY - HH:mm');
          })
          this.sharedService.stopBlockUI();
        });
        }, err => {
          if(err.status === 404) {
            this.errorMessage = "Usuário não encontrado";
          } else {
            this.errorMessage = err.error[Object.keys(err.error)[0]][0] + ': ' + Object.keys(err.error)[0];
          }
          console.log(err);
          this.sharedService.stopBlockUI();
        }
      );
    }
  }
  public maskString(): string {
    let newString = '';
    for(let i = 0; i < 15; i++) {
      if(i === 3 || i === 7 || i === 11) {
        newString = newString.concat('.');
        newString = newString.concat(this.patient.nro_sus[i]);
      } else {
        newString = newString.concat(this.patient.nro_sus[i]);
      }
    }
    return newString;
  }
}