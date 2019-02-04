import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TestService, PatientService, UserService, SharedService } from '@services';
import { Subjective, Patient, User } from '@models';

//import { PdfmakeService } from 'ng-pdf-make/pdfmake/pdfmake.service';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.scss']
})
export class FinalComponent implements OnInit, OnDestroy {

  public docDefinition = {
    content: [],
    styles: {
      header: {
        fontSize: 22,
        bold: true
      },
      subheader: {
        fontSize: 18,
        bold: true
      },
      resp: {
        bold:true
      }
    }
  };

  public sub: any;

  public testId: number;
  public test: Subjective = {};

  public errorMessage: string;
  
  public fatores: string[];

  public patient: Patient = {};
  public user: User = {};

  public simulation: Boolean;

  public simulationTest =  {
    q1 : '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private testService: TestService,
    private router: Router,
    private patientService: PatientService,
    private userService: UserService,
    private sharedService: SharedService,
    //private pdfmake: PdfmakeService
  ) { }


  ngOnInit() {
    
    this.simulation = this.activatedRoute.snapshot.data['simulation'];
    if (!this.simulation) {
        this.sharedService.startBlockUI();
        this.sub = this.activatedRoute.params.subscribe(params => {
          this.testId = +params['id'];
        });
        
        this.testService.findSubjetivaById(this.testId).subscribe(subjective => {
        this.test = subjective;
        if(+this.test.q1_perdeu_peso === 1) {
          this.simulationTest.q1 = 'Sim, ' + this.test.q1_perdeu_peso_kg + ' Kg';
        } else if (this.test.q1_perdeu_peso === 2) { 
          this.simulationTest.q1 = 'Não';
        } else if (this.test.q1_perdeu_peso === 3) {
          this.simulationTest.q1 = 'Não Sabe';
        } else if (this.test.q1_perdeu_peso === 4) {
          this.simulationTest.q1 = 'Não Respondeu';
        }
        const replaced = this.test.fatores.replace(/'/g, '"');
        this.fatores = JSON.parse(replaced);
        this.patientService.findById(this.test.paciente).subscribe(patient => this.patient = patient);
        this.userService.getUserById(this.test.usuario).subscribe(user => this.user = user);
        console.log('bla');
        
        this.sharedService.stopBlockUI();
      }, err => {
        // TODO Ver se é assim que ele vai retornar o erro
        this.errorMessage = err.msg;
        console.log(err);
        this.sharedService.stopBlockUI();
      });
    } else {
      this.sharedService.startBlockUI();
      this.activatedRoute.params.subscribe(params => {
        this.test = params;
      // this.test = this.activatedRoute.snapshot.params;
      this.fatores = [
        'Desempenho Cognitivo',
        'Sintomas Depressivos',
        'Atividades Avançadas de Vida Diária',
        'Equilíbrio',
        'Mobilidade'
      ];
      this.sharedService.stopBlockUI();
      });
    }
  }
  ngOnDestroy() {
    if (!this.simulation) {
      this.sub.unsubscribe();
    }
  }
  public back() {
    if (this.simulation) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/']); 
    }
  }

  public createPDF() {
    this.docDefinition = {
      content: [],
      styles: {
        header: {
          fontSize: 22,
          bold: true
        },
        subheader: {
          fontSize: 18,
          bold: true
        },
        resp: {
          bold:true
        }
      }
    };
    this.addText('Avaliação de ' + this.patient.nome, 'header');
    if(this.user.nome) {
      this.addText('Agente: ' + this.user.nome);
    } else {
      this.addText('Agente: ' + this.user.username);
    } 
    if(this.test === 'F') {
      this.addText('Condição: Frágil', 'header');
    } else if(this.test === 'N') {
      this.addText('Condição: Não Frágil', 'header');
    }  else if(this.test === 'P') {
      this.addText('Condição: Pré Fŕagil', 'header');
    }
    
    this.addText(' ');
    
    this.addText('Q1) Nos últimos 12 meses (último ano) O(a) Sr(a) acha que perdeu peso sem fazer nenhuma dieta?');
    if(this.test.q1_perdeu_peso === 1) {
      this.addText('Resposta: ' + 'Sim, ' + this.test.q1_perdeu_peso_kg + 'Kg', 'resp');
    } else if(this.test.q1_perdeu_peso === 2) {
      this.addText('Resposta: ' + 'Não', 'resp');
    } else if(this.test.q1_perdeu_peso === 3) {
      this.addText('Resposta: ' + 'Não Sabe', 'resp');
    } else if(this.test.q1_perdeu_peso === 4) {
      this.addText('Resposta: ' + 'Não Respondeu', 'resp');
    }
    this.addText(' ');
    this.addText('Q2) O(a) Sr(a) acha que faz menos atividades físicas do que há 12 meses atrás (há um ano)?');
    if(this.test.q2_ativ_fisica === 1) {
      this.addText('Resposta: ' + 'Sim', 'resp');
    } else if(this.test.q2_ativ_fisica === 2) {
      this.addText('Resposta: ' + 'Não', 'resp');
    } else if(this.test.q2_ativ_fisica === 3) {
      this.addText('Resposta: ' + 'Não Sabe', 'resp');
    } else if(this.test.q2_ativ_fisica === 4) {
      this.addText('Resposta: ' + 'Não Respondeu', 'resp');
    }
    this.addText(' ');
    this.addText('Q3) Nos últimos 12 meses (último ano), o(a) Sr(a) acha que sua força diminuiu?');
    if(this.test.q3_red_forca === 1) {
      this.addText('Resposta: ' + 'Sim', 'resp');
    } else if(this.test.q3_red_forca === 2) {
      this.addText('Resposta: ' + 'Não', 'resp');
    } else if(this.test.q3_red_forca === 3) {
      this.addText('Resposta: ' + 'Não Sabe', 'resp');
    } else if(this.test.q3_red_forca === 4) {
      this.addText('Resposta: ' + 'Não Respondeu', 'resp');
    }
    this.addText(' ');
    this.addText('Q4) O(a) Sr(a) acha que hoje está caminhando mais devagar do que caminhava há 12 meses atrás (um ano)?');
    if(this.test.q4_red_caminhada === 1) {
      this.addText('Resposta: ' + 'Sim', 'resp');
    } else if(this.test.q4_red_caminhada === 2) {
      this.addText('Resposta: ' + 'Não', 'resp');
    } else if(this.test.q4_red_caminhada === 3) {
      this.addText('Resposta: ' + 'Não Sabe', 'resp');
    } else if(this.test.q4_red_caminhada === 4) {
      this.addText('Resposta: ' + 'Não Respondeu', 'resp');
    }
    this.addText(' ');
    this.addText('Q5) O(a) Sr(a) sentiu que teve que fazer algum esforço para dar conta de suas tarefas do dia-a-dia?');
    if(this.test.q5_fadiga === 1) {
      this.addText('Resposta: ' + 'Sim', 'resp');
    } else if(this.test.q5_fadiga === 2) {
      this.addText('Resposta: ' + 'Não', 'resp');
    } else if(this.test.q5_fadiga === 3) {
      this.addText('Resposta: ' + 'Não Sabe', 'resp');
    } else if(this.test.q5_fadiga === 4) {
      this.addText('Resposta: ' + 'Não Respondeu', 'resp');
    }
    this.addText(' ');
    this.addText('Q6) O(a) Sr(a) sentiu que não conseguiria levar adiante as suas tarefas?');
    if(this.test.q5_fadiga === 1) {
      this.addText('Resposta: ' + 'Nunca ou raramente', 'resp');
    } else if(this.test.q5_fadiga === 2) {
      this.addText('Resposta: ' + 'Às vezes', 'resp');
    } else if(this.test.q5_fadiga === 3) {
      this.addText('Resposta: ' + 'Frequentemente', 'resp');
    } else if(this.test.q5_fadiga === 4) {
      this.addText('Resposta: ' + 'Sempre', 'resp');
    }
    this.addText(' ');
    this.addText('Fatores a serem investigados', 'subheader');
    const fatoresCopy = Object.create(this.fatores);
    this.addOrderedList(fatoresCopy);
    pdfMake.createPdf(this.docDefinition).download('avaliacao_subjetiva_'+this.patient.nome+'.pdf');
  }

  public addText(text: string, style?: string) {
    if(style) {
      this.docDefinition.content.push({text: text, style: style});
    } else {
      this.docDefinition.content.push({text: text});
    }
  }
  public addOrderedList(list: string[]) {
      let i = 1;
      list.forEach(element => {
        this.addText(i + '. ' + element);
        i++;
      });
  }
}
