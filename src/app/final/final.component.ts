import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TestService, PatientService, UserService, SharedService } from '@services';
import { Subjective, Patient, User } from '@models';

//import { PdfmakeService } from 'ng-pdf-make/pdfmake/pdfmake.service';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.scss']
})
export class FinalComponent implements OnInit, OnDestroy {

  public sub: any;

  public testId: number;
  public test: Subjective = {};

  public errorMessage: string;
  
  public fatores: string[];

  public patient: Patient = {};
  public user: User = {};
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
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.testId = +params['id'];
  });

    this.sharedService.startBlockUI();
    this.testService.findSubjetivaById(this.testId).subscribe(subjective => {
      this.test = subjective;
      const replaced = this.test.fatores.replace(/'/g, '"');
      this.fatores = JSON.parse(replaced);
      this.patientService.findById(this.test.paciente).subscribe(patient => this.patient = patient);
      this.userService.getUserById(this.test.usuario).subscribe(user => this.user = user);
      this.sharedService.stopBlockUI();
      console
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

    /*this.pdfmake.configureStyles({ header: { fontSize: 18, bold: true }, resp: {bold: true} });
    
    this.pdfmake.addText('Avaliação de ' + this.patient.nome, 'header');
    if(this.user.nome) {
      this.pdfmake.addText('Agente: ' + this.user.nome);
    } else {
      this.pdfmake.addText('Agente: ' + this.user.username);
    } 
    if(this.test === 'F') {
      this.pdfmake.addText('Condição: Frágil', 'header');
    } else if(this.test === 'N') {
      this.pdfmake.addText('Condição: Não Frágil', 'header');
    }  else if(this.test === 'P') {
      this.pdfmake.addText('Condição: Pré Fŕagil', 'header');
    }
    
    this.pdfmake.addText(' ');
    
    this.pdfmake.addText('Q1) Nos últimos 12 meses (último ano) O(a) Sr(a) acha que perdeu peso sem fazer nenhuma dieta?');
    if(this.test.q1_perdeu_peso === 1) {
      this.pdfmake.addText('Resposta: ' + 'Sim, ' + this.test.q1_perdeu_peso_kg + 'Kg', 'resp');
    } else if(this.test.q1_perdeu_peso === 2) {
      this.pdfmake.addText('Resposta: ' + 'Não', 'resp');
    } else if(this.test.q1_perdeu_peso === 3) {
      this.pdfmake.addText('Resposta: ' + 'Não Sabe', 'resp');
    } else if(this.test.q1_perdeu_peso === 4) {
      this.pdfmake.addText('Resposta: ' + 'Não Respondeu', 'resp');
    }
    this.pdfmake.addText(' ');
    this.pdfmake.addText('Q2) O(a) Sr(a) acha que faz menos atividades físicas do que há 12 meses atrás (há um ano)?');
    if(this.test.q2_ativ_fisica === 1) {
      this.pdfmake.addText('Resposta: ' + 'Sim', 'resp');
    } else if(this.test.q2_ativ_fisica === 2) {
      this.pdfmake.addText('Resposta: ' + 'Não', 'resp');
    } else if(this.test.q2_ativ_fisica === 3) {
      this.pdfmake.addText('Resposta: ' + 'Não Sabe', 'resp');
    } else if(this.test.q2_ativ_fisica === 4) {
      this.pdfmake.addText('Resposta: ' + 'Não Respondeu', 'resp');
    }
    this.pdfmake.addText(' ');
    this.pdfmake.addText('Q3) Nos últimos 12 meses (último ano), o(a) Sr(a) acha que sua força diminuiu?');
    if(this.test.q3_red_forca === 1) {
      this.pdfmake.addText('Resposta: ' + 'Sim', 'resp');
    } else if(this.test.q3_red_forca === 2) {
      this.pdfmake.addText('Resposta: ' + 'Não', 'resp');
    } else if(this.test.q3_red_forca === 3) {
      this.pdfmake.addText('Resposta: ' + 'Não Sabe', 'resp');
    } else if(this.test.q3_red_forca === 4) {
      this.pdfmake.addText('Resposta: ' + 'Não Respondeu', 'resp');
    }
    this.pdfmake.addText(' ');
    this.pdfmake.addText('Q4) O(a) Sr(a) acha que hoje está caminhando mais devagar do que caminhava há 12 meses atrás (um ano)?');
    if(this.test.q4_red_caminhada === 1) {
      this.pdfmake.addText('Resposta: ' + 'Sim', 'resp');
    } else if(this.test.q4_red_caminhada === 2) {
      this.pdfmake.addText('Resposta: ' + 'Não', 'resp');
    } else if(this.test.q4_red_caminhada === 3) {
      this.pdfmake.addText('Resposta: ' + 'Não Sabe', 'resp');
    } else if(this.test.q4_red_caminhada === 4) {
      this.pdfmake.addText('Resposta: ' + 'Não Respondeu', 'resp');
    }
    this.pdfmake.addText(' ');
    this.pdfmake.addText('Q5) O(a) Sr(a) sentiu que teve que fazer algum esforço para dar conta de suas tarefas do dia-a-dia?');
    if(this.test.q5_fadiga === 1) {
      this.pdfmake.addText('Resposta: ' + 'Sim', 'resp');
    } else if(this.test.q5_fadiga === 2) {
      this.pdfmake.addText('Resposta: ' + 'Não', 'resp');
    } else if(this.test.q5_fadiga === 3) {
      this.pdfmake.addText('Resposta: ' + 'Não Sabe', 'resp');
    } else if(this.test.q5_fadiga === 4) {
      this.pdfmake.addText('Resposta: ' + 'Não Respondeu', 'resp');
    }
    this.pdfmake.addText(' ');
    this.pdfmake.addText('Q6) O(a) Sr(a) sentiu que não conseguiria levar adiante as suas tarefas?');
    if(this.test.q5_fadiga === 1) {
      this.pdfmake.addText('Resposta: ' + 'Nunca ou raramente', 'resp');
    } else if(this.test.q5_fadiga === 2) {
      this.pdfmake.addText('Resposta: ' + 'Às vezes', 'resp');
    } else if(this.test.q5_fadiga === 3) {
      this.pdfmake.addText('Resposta: ' + 'Frequentemente', 'resp');
    } else if(this.test.q5_fadiga === 4) {
      this.pdfmake.addText('Resposta: ' + 'Sempre', 'resp');
    }
    this.pdfmake.addText(' ');
    this.pdfmake.addText('Fatores a serem investigados', 'header');
    const fatoresCopy = Object.create(this.fatores);
    this.pdfmake.addOrderedList(fatoresCopy);
    this.pdfmake.download('avaliacao_subjetiva_'+this.patient.nome  );*/
  }
}
