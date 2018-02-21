import { Component, OnInit, OnDestroy } from '@angular/core';
import { Edmonton, PhotoFile } from '@models';
import { TestService, SharedService } from '@services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edmonton-analyze',
  templateUrl: './edmonton-analyze.component.html',
  styleUrls: ['./edmonton-analyze.component.scss']
})
export class EdmontonAnalyzeComponent implements OnInit, OnDestroy {

  public question = 1;
  public patientId: number;
  
  public edmonton: Edmonton = {};
  public errorMessage = '';

  private sub: any;

  public q3_array: number[] = [];

  public photo_file: PhotoFile = {};

  constructor(
    private testService: TestService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService
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

  public saveQ1(Q1: number) {
    this.edmonton.q1_cognicao = Q1;
    console.log('RESPOSTA: ', Q1);
  }
  public saveQ2a(Q2: number) {
    this.edmonton.q2_estado_saude_A = Q2;
    console.log('RESPOSTA: ', Q2);
  }

  public saveQ2b(Q3: number) {
    this.edmonton.q2_estado_saude_B = Q3;
    console.log('RESPOSTA: ', Q3);
  }

  public saveQ3(Q4: number) {
    this.edmonton.q3_ind_func = Q4;
    console.log('RESPOSTA: ', Q4);
  }

  public saveQ4(Q5: number) {
    this.edmonton.q4_sup_social = Q5;
    console.log('RESPOSTA: ', Q5);
  }
  public saveQ5a(Q6: number) {
    this.edmonton.q5_medicamento_A = Q6;
    console.log('RESPOSTA: ', Q6);
  }
  public saveQ5b(Q3: number) {
    this.edmonton.q5_medicamento_B = Q3;
    console.log('RESPOSTA: ', Q3);
  }

  public saveQ6(Q4: number) {
    this.edmonton.q6_nutricao = Q4;
    console.log('RESPOSTA: ', Q4);
  }

  public saveQ7(Q5: number) {
    this.edmonton.q7_humor = Q5;
    console.log('RESPOSTA: ', Q5);
  }
  public saveQ8(Q6: number) {
    this.edmonton.q8_continencia = Q6;
    console.log('RESPOSTA: ', Q6);
  }
  public saveQ9(Q6: number) {
    this.edmonton.q9_desemp_func = Q6;
    console.log('RESPOSTA: ', Q6);
  }

  public get_time(time: number) {
    this.edmonton.q9_desemp_func_tempo = time;
    console.log('RESPOSTA TIME: ', time);
  }

  public saveTest() {

    console.log(this.q3_array);
    console.log(this.edmonton);
    console.log(this.photo_file);
    
    this.edmonton.q1_foto_relogio = this.photo_file.value;

    if(!this.edmonton.q1_cognicao) {
      this.errorMessage = "Questão 1 não foi respondida";
      return;
    }
    if(!this.edmonton.q2_estado_saude_A) {
      this.errorMessage = "Questão 1 não foi informado o peso";
      return;
    }
    if(!this.edmonton.q2_estado_saude_B) {
      this.errorMessage = "Questão 2 não foi respondida";
      return;
    }
    if(!this.edmonton.q4_sup_social) {
      this.errorMessage = "Questão 4 não foi respondida";
      return;
    }
    if(!this.edmonton.q5_medicamento_A) {
      this.errorMessage = "Questão 5 não foi respondida";
      return;
    }
    if(!this.edmonton.q5_medicamento_B) {
      this.errorMessage = "Questão 6 não foi respondida";
      return;
    }
    if(!this.edmonton.q6_nutricao) {
      this.errorMessage = "Questão 5 não foi respondida";
      return;
    }
    if(!this.edmonton.q7_humor) {
      this.errorMessage = "Questão 6 não foi respondida";
      return;
    }
    if(!this.edmonton.q8_continencia) {
      this.errorMessage = "Questão 5 não foi respondida";
      return;
    }
    if(!this.edmonton.q9_desemp_func) {
      this.errorMessage = "Questão 6 não foi respondida";
      return;
    }
    if(this.edmonton.q9_desemp_func === 1 && !this.edmonton.q9_desemp_func_tempo) {
      this.errorMessage = "Questão 1 não foi informado o peso";
      return;
    }
    this.edmonton.paciente = this.patientId;
    console.log(this.edmonton)
    this.sharedService.startBlockUI();
    this.testService.edmonton(this.edmonton)
    .subscribe(edmonton => {
      console.log(edmonton);
      this.router.navigate(['/final-edmonton', edmonton.id]);
      this.sharedService.stopBlockUI();
    }, err => {
      // TODO Ver se é assim que ele vai retornar o erro
      this.errorMessage = err.msg;
      console.log(err);
      this.sharedService.stopBlockUI();
    })
  }
}