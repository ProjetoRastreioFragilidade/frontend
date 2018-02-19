import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, PatientService, TestService } from '@services';
import { Patient, Test } from '@models';

// TODO -> arrumar data 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public susNumber: string;
  
  public tests: Test[];
  public patient: Patient;

  public isEmpty = false;
  public errorMessage: string;


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private patientService: PatientService,
    private testService: TestService
  ) { }

  ngOnInit() {
    this.tests = [];
  }
  public createPatient() {
    this.router.navigate(['/registra-paciente']); 
  }
  public createHealthCenter() {
    this.router.navigate(['/registra-posto']); 
  }

  public newEdmonton() { //passa ir do paciente
    this.router.navigate(['/edmonton']); 
  }

  public newSubjective() { //passa ir do paciente
    this.router.navigate(['/subjetiva', this.patient.id]); 
  }
  
  public seeResults(testId: number, testTipo: string) {
    if (testTipo === 'e') {
      this.router.navigate(['/final', testId]); 
    } else {
      this.router.navigate(['/final', testId]); 
    }
  }

  public logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  
  public searchPatient() {
    
    this.tests = [];
    this.isEmpty = false;
    this.errorMessage = '';
    if (this.susNumber.length < 15) {
      this.errorMessage = "Número SUS inválido!";
      return;
    } else {
      this.patientService.findBySUSNumber(this.susNumber).subscribe((patient: Patient) => {
        this.patient = patient;
        console.log(patient);
        this.testService.findByPatientId(this.patient.id).subscribe((tests: Test[]) => {
          this.tests = tests;
          if (tests.length === 0) {
            this.isEmpty = true;
          }
        });
        }, err => {
          if(err.status === 400) {
            this.errorMessage = "Usuário não encontrado";
          } else {
            this.errorMessage = err.error[Object.keys(err.error)[0]][0] + ': ' + Object.keys(err.error)[0];
          }
          console.log(err);
        }
      );
    }
  }
}