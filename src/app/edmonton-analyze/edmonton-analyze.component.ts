import { Component, OnInit, OnDestroy } from '@angular/core';
import { Edmonton } from '@models';
import { TestService, SharedService, UploadService } from '@services';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

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

  public simulation: boolean;

  constructor(
    private testService: TestService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private uploadService: UploadService
  ) { }

  ngOnInit() {
    this.simulation = this.activatedRoute.snapshot.data['simulation'];
    if (!this.simulation) {
      this.sub = this.activatedRoute.params.subscribe(params => {
        this.patientId = +params['id'];
      });
      this.edmonton.q3_ind_func = [];
      this.edmonton.data_inicio = moment().format('YYYY-MM-DD HH:mm');
    }
  }

  ngOnDestroy() {
    if (!this.simulation) {
      this.sub.unsubscribe();
    }
  }

  public goTo(question: number) {
    this.question = question;
  }

  public saveQ1(Q1: number) {
    this.edmonton.q1_cognicao = Q1;
  }
  public saveQ2a(Q2: number) {
    this.edmonton.q2_estado_saude_A = Q2;
  }

  public saveQ2b(Q3: number) {
    this.edmonton.q2_estado_saude_B = Q3;
  }

  public saveQ3(Q4: number[]) {
    this.edmonton.q3_ind_func = Q4;
  }

  public saveQ4(Q5: number) {
    this.edmonton.q4_sup_social = Q5;
  }
  public saveQ5a(Q6: number) {
    this.edmonton.q5_medicamento_A = Q6;
  }
  public saveQ5b(Q3: number) {
    this.edmonton.q5_medicamento_B = Q3;
  }

  public saveQ6(Q4: number) {
    this.edmonton.q6_nutricao = Q4;
  }

  public saveQ7(Q5: number) {
    this.edmonton.q7_humor = Q5;
  }
  public saveQ8(Q6: number) {
    this.edmonton.q8_continencia = Q6;
  }
  public saveQ9(Q6: number) {
    this.edmonton.q9_desemp_func = Q6;
  }

  public get_time(time: number) {
    this.edmonton.q9_desemp_func_tempo = time;
  }

  public get_photo(photoUrl: string) {
    //this.edmonton.q1_foto_relogio = photo.value;
    this.edmonton.q1_foto_relogio = photoUrl;
  }

  public saveTest() {
    if(!this.edmonton.q1_cognicao) {
      this.errorMessage = "Questão 1 não foi respondida.";
      return;
    }
    if (!this.simulation) {
      if(this.edmonton.q1_cognicao && !this.edmonton.q1_foto_relogio) {
        this.errorMessage = "Questão 1 não possui foto.";
        return;
      }
    }
    if(!this.edmonton.q2_estado_saude_A) {
      this.errorMessage = "Questão 2a não foi respondida.";
      return;
    }
    if(!this.edmonton.q2_estado_saude_B) {
      this.errorMessage = "Questão 2b não foi respondida.";
      return;
    }
    if(!this.edmonton.q4_sup_social) {
      this.errorMessage = "Questão 4 não foi respondida.";
      return;
    }
    if(!this.edmonton.q5_medicamento_A) {
      this.errorMessage = "Questão 5a não foi respondida.";
      return;
    }
    if(!this.edmonton.q5_medicamento_B) {
      this.errorMessage = "Questão 5b não foi respondida.";
      return;
    }
    if(!this.edmonton.q6_nutricao) {
      this.errorMessage = "Questão 6 não foi respondida.";
      return;
    }
    if(!this.edmonton.q7_humor) {
      this.errorMessage = "Questão 7 não foi respondida.";
      return;
    }
    if(!this.edmonton.q8_continencia) {
      this.errorMessage = "Questão 8 não foi respondida.";
      return;
    }
    if(!this.edmonton.q9_desemp_func) {
      this.errorMessage = "Questão 9 não foi respondida.";
      return;
    }
    if(this.edmonton.q9_desemp_func === 1 && !this.edmonton.q9_desemp_func_tempo) {
      this.errorMessage = "Questão 9 não foi informado o peso exato";
      return;
    }
    this.edmonton.paciente = this.patientId;

    if (!this.simulation) {
      this.sharedService.startBlockUI();
      this.testService.edmonton(this.edmonton)
      .subscribe(edmonton => {
        this.router.navigate(['/final-edmonton', edmonton.id]);
        this.sharedService.stopBlockUI();
      }, err => {
        // TODO Ver se é assim que ele vai retornar o erro
        this.errorMessage = err.msg;
        console.log(err);
        this.sharedService.stopBlockUI();
      });
    } else {
      this.edmonton.score += this.edmonton.q1_cognicao - 1;
      this.edmonton.score += this.edmonton.q2_estado_saude_A - 1;
      if (this.edmonton.q2_estado_saude_B >= 4) {
        this.edmonton.score += this.edmonton.q2_estado_saude_B - 3;
      }
      if (this.edmonton.q3_ind_func.length >= 5) {
        this.edmonton.score +=2;
      } else if (this.edmonton.q3_ind_func.length >= 2) {
        this.edmonton.score++;
      }
      this.edmonton.score = this.edmonton.q4_sup_social - 1;
      if (this.edmonton.q5_medicamento_A == 1) {
        this.edmonton.score++;
      }
      if (this.edmonton.q5_medicamento_B == 1) {
        this.edmonton.score++;
      }      
      if (this.edmonton.q6_nutricao == 1) {
        this.edmonton.score++;
      }
      if (this.edmonton.q7_humor == 1) {
        this.edmonton.score++;
      }
      if (this.edmonton.q8_continencia == 1) {
        this.edmonton.score++;
      }
      this.edmonton.score += this.edmonton.q9_desemp_func - 1;
      if (this.edmonton.score <= 4) {
        this.edmonton.fragilidade = 'N';
      } else if (this.edmonton.score <= 6) {
        this.edmonton.fragilidade = 'V';
      } else if (this.edmonton.score <= 8) {
        this.edmonton.fragilidade = 'L';
      } else if (this.edmonton.score <= 10) {
        this.edmonton.fragilidade = 'M';
      } else if (this.edmonton.score > 10 ) {
        this.edmonton.fragilidade = 'S';
      } else {
        this.edmonton.fragilidade = 'LUL';
      }
      this.router.navigate(['/final-edmonton/simulacao', this.edmonton]);
    }
  }
}
