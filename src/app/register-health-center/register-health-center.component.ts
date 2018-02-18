import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-health-center',
  templateUrl: './register-health-center.component.html',
  styleUrls: ['./register-health-center.component.scss']
})
export class RegisterHealthCenterComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  public back() {
    this.router.navigate(['/']); 
  }
  public submit() {
  }
}
