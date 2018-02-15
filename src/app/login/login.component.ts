import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  public errorMessage: string;

  constructor(
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
  }

  public login() {
    this.errorMessage = undefined;
    this.authService.login(this.username, this.password).subscribe(res => {
      console.log(res);
      localStorage.setItem('currentUser', JSON.stringify(
        {username: this.username, token: res.token}));   
    }, err => {
      // TODO Ver se é assim que ele vai retornar o erro
      this.errorMessage = err.msg;
      console.log(err);
    })
    
  }

}
