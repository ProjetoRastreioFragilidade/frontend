import { Component, OnInit } from '@angular/core';
import { AuthenticationService, SharedService } from '@services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username = '';
  public password = '';
  public errorMessage: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
  }

  public login() {
    this.errorMessage = ''
    if (!this.username || !this.password) {
      this.errorMessage = 'Insira seu login e sua senha.'
      return;
    }
    this.sharedService.startBlockUI();
    this.authService.authenticate(this.username, this.password)
    .subscribe(res => {
      localStorage.setItem('currentUser', JSON.stringify({
        username: this.username, 
        token: res.token
      }));
      this.sharedService.stopBlockUI();
      this.router.navigate(['/']); 
    }, err => {
      this.errorMessage = err.error[Object.keys(err.error)[0]][0];
      console.log(err);
      this.sharedService.stopBlockUI();
    })
    
  }
  public simulateSub() {
    this.router.navigate(['/subjetiva/simulacao']);
  }
  public simulateEdm() {
    this.router.navigate(['/edmonton/simulacao']);
  }

}
