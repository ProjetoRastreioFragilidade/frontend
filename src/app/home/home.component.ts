import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, PatientService } from '@services';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public susNumber: string;

  public errorMessage: string;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private patientService: PatientService
  ) { }

  ngOnInit() {
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
    this.router.navigate(['/subjetiva']); 
  }

  public logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  
  public searchPatient() {
    if (this.susNumber.length < 15) {
      console.log("número sus inválido!");
    } else {
      this.patientService.findBySUSNumber(this.susNumber).subscribe(res => {
        console.log(res);     
      }, err => {
        // TODO Ver se é assim que ele vai retornar o erro
        this.errorMessage = err;
        console.log(err);
      })
    }
  }
}