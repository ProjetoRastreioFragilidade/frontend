import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subjective } from '@models';
import { TestService } from '@services';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-subjective-analyze',
  templateUrl: './subjective-analyze.component.html',
  styleUrls: ['./subjective-analyze.component.scss']
})
export class SubjectiveAnalyzeComponent implements OnInit, OnDestroy {

  public question = 1;
  public patientId: number;

  public subjective: Subjective = {};
  public errorMessage = '';

  private sub: any;
  
  constructor(
    private testService: TestService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.patientId = +params['id'];
   });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public goTo(question: number) {
    this.question = question;
  }

  public saveQ1(Q1: number, loss: number) {
    this.subjective.q1_perdeu_peso = Q1;
    this.subjective.q1_perdeu_peso_kg = loss;
    console.log('RESPOSTA: ', Q1);
  }
  public saveQ2(Q2: number) {
    this.subjective.q2_ativ_fisica = Q2;
    console.log('RESPOSTA: ',Q2);
  }

  public saveQ3(Q3: number) {
    this.subjective.q3_red_forca = Q3;
    console.log('RESPOSTA: ', Q3);
  }

  public saveQ4(Q4: number) {
    this.subjective.q4_red_caminhada = Q4;
    console.log('RESPOSTA: ', Q4);
  }

  public saveQ5(Q5: number) {
    this.subjective.q5_fadiga = Q5;
    console.log('RESPOSTA: ', Q5);
  }
  public saveQ6(Q6: number) {
    this.subjective.q6_desanimo = Q6;
    console.log('RESPOSTA: ', Q6);
  }

  public saveTest() {
    this.subjective.q1_perdeu_peso_kg = 2.0;
    this.subjective.paciente = this.patientId;
    console.log(this.subjective)
    this.testService.subjective(this.subjective).subscribe(subjective => {
      console.log(subjective);     
      this.router.navigate(['/final', subjective.id]); 
    }, err => {
      // TODO Ver se é assim que ele vai retornar o erro
      this.errorMessage = err.msg;
      console.log(err);
    })
  }
}
