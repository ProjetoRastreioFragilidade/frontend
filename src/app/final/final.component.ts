import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TestService, PatientService, UserService } from '@services';
import { Subjective, Patient, User } from '@models';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.scss']
})
export class FinalComponent implements OnInit, OnDestroy {

  public sub: any;

  public testId: number;
  public test: Subjective = {};

  public fatores: string

  public patient: Patient = {};
  public user: User = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    private testService: TestService,
    private router: Router,
    private patientService: PatientService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.testId = +params['id'];
  });
    this.testService.findTestById(this.testId).subscribe(subjective => {
      this.test = subjective;
      const replaced = this.test.fatores.replace(/'/g, '"');
      this.fatores = JSON.parse(replaced);
      this.patientService.findById(this.test.paciente).subscribe(patient => this.patient = patient);
      this.userService.getUserById(this.test.usuario).subscribe(user => this.user = user);
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  public back() {
    this.router.navigate(['/']); 
  }

  public createPDF() {
    // TODO -> gerar pdf
  }
}
