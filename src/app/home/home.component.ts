import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@services';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public susNumber: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: HttpClient
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
      console.log(this.susNumber);
      // this.http.post('http://localhost:8000/'+'123456789012345'+'/');
    }
  }
}
// http://localhost:8000/busca/123456789012345/