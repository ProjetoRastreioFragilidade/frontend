import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subjective } from '@models';
import { TestService, SharedService } from '@services';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';


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
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.data['simulation']);
    
    if (!this.activatedRoute.snapshot.data['simulation']) {
      this.sub = this.activatedRoute.params.subscribe(params => {
        this.patientId = +params['id'];
      });
  
      this.subjective.data_inicio = moment().format('YYYY-MM-DD HH:mm');
    }
  }
  ngOnDestroy() {
    if (!this.activatedRoute.snapshot.data['simulation']) {
      this.sub.unsubscribe();
    }
  }

  public goTo(question: number) {
    this.question = question;
  }

  public saveQ1(Q1: number) {
    this.subjective.q1_perdeu_peso = Q1;
  }
  public saveQ2(Q2: number) {
    this.subjective.q2_ativ_fisica = Q2;
  }

  public saveQ3(Q3: number) {
    this.subjective.q3_red_forca = Q3;
  }

  public saveQ4(Q4: number) {
    this.subjective.q4_red_caminhada = Q4;
  }

  public saveQ5(Q5: number) {
    this.subjective.q5_fadiga = Q5;
  }

  public saveQ6(Q6: number) {
    this.subjective.q6_desanimo = Q6;
  }

  public get_kg(q1_kg: number) {
    this.subjective.q1_perdeu_peso_kg = q1_kg;
  }

  public saveTest() {
      if(!this.subjective.q1_perdeu_peso) {
        this.errorMessage = "Questão 1 não foi respondida";
        return;
      }
      if(this.subjective.q1_perdeu_peso === 1 && !this.subjective.q1_perdeu_peso_kg) {
        this.errorMessage = "Questão 1 não foi informado o peso";
        return;
      }
      if(!this.subjective.q2_ativ_fisica) {
        this.errorMessage = "Questão 2 não foi respondida";
        return;
      }
      if(!this.subjective.q3_red_forca) {
        this.errorMessage = "Questão 3 não foi respondida";
        return;
      }
      if(!this.subjective.q4_red_caminhada) {
        this.errorMessage = "Questão 4 não foi respondida";
        return;
      }
      if(!this.subjective.q5_fadiga) {
        this.errorMessage = "Questão 5 não foi respondida";
        return;
      }
      if(!this.subjective.q6_desanimo) {
        this.errorMessage = "Questão 6 não foi respondida";
        return;
      }
      this.subjective.paciente = this.patientId;

      this.sharedService.startBlockUI();
      if (!this.activatedRoute.snapshot.data['simulation']) {
        this.testService.subjective(this.subjective).subscribe(subjective => {
          this.router.navigate(['/final', subjective.id]);
          this.sharedService.stopBlockUI();
        }, err => {
          // TODO Ver se é assim que ele vai retornar o erro
          this.errorMessage = err.msg;
          console.log(err);
          this.sharedService.stopBlockUI();
        })
      } else {
        this.sharedService.stopBlockUI();
        this.router.navigate(['/final/simulacao']);
      }
  }
}
