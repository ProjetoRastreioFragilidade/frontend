import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    //private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

}
