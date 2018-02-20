import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TestService, PatientService, UserService, SharedService } from '@services';
import { Subjective, Patient, User } from '@models';

@Component({
  selector: 'app-final-edmonton',
  templateUrl: './final-edmonton.component.html',
  styleUrls: ['./final-edmonton.component.scss']
})
export class FinalEdmontonComponent implements OnInit {

  public sub: any;
  
  public errorMessage: string;

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
    private userService: UserService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.testId = +params['id'];
  });

    this.sharedService.startBlockUI();
    this.testService.findEdmontonById(this.testId).subscribe(edmonton => {
      this.test = edmonton;
      const replaced = this.test.fatores.replace(/'/g, '"');
      this.fatores = JSON.parse(replaced);
      this.patientService.findById(this.test.paciente).subscribe(patient => this.patient = patient);
      this.userService.getUserById(this.test.usuario).subscribe(user => this.user = user);
      this.sharedService.stopBlockUI();
    }, err => {
      // TODO Ver se é assim que ele vai retornar o erro
      this.errorMessage = err.msg;
      console.log(err);
      this.sharedService.stopBlockUI();
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
