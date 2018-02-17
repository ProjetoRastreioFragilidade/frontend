import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
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
}
