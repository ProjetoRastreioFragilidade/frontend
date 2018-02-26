import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TestService, PatientService, UserService, SharedService } from '@services';
import { Edmonton, Patient, User } from '@models';

//import { PdfmakeService } from 'ng-pdf-make/pdfmake/pdfmake.service';

@Component({
  selector: 'app-final-edmonton',
  templateUrl: './final-edmonton.component.html',
  styleUrls: ['./final-edmonton.component.scss']
})
export class FinalEdmontonComponent implements OnInit {

  public sub: any;
  
  public errorMessage: string;

  public testId: number;
  public test: Edmonton = {};

  public fatores: string[];

  public patient: Patient = {};
  public user: User = {};
  public activities = [
    "Preparar refeição (cozinha)",
    "Usar o telefone",
    "Transporte (se locomover)",
    "Lavar a roupa",
    "Cuidar da casa (limpar/arrumar)",
    "Cuidar do dinheiro",
    "Fazer compras",
    "Tomar Remédios"
  ];
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private testService: TestService,
    private router: Router,
    private patientService: PatientService,
    private userService: UserService,
    private sharedService: SharedService,
   // private pdfmake: PdfmakeService
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
    // TODO -> adicionar foto do relógio
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
    this.pdfmake.addText('Q1)</strong>Por favor, imagine que este circulo é um relógio. Eu gostaria que você colocasse os números nas posições corretas e que depois incluisse os ponteiros de forma a indicar onze horas e dez minutos.');
    if(this.test.q1_cognicao === 1) {
      this.pdfmake.addText('Resposta: ' + 'Aprovado', 'resp');
    } else if(this.test.q1_cognicao === 2) {
      this.pdfmake.addText('Resposta: ' + 'Reprovado com error mínimos', 'resp');
    } else if(this.test.q1_cognicao === 3) {
      this.pdfmake.addText('Resposta: ' + 'Reprovado com erros significantes', 'resp');
    }

    this.pdfmake.addText(' ');
    this.pdfmake.addText('Q2a)</strong> Nos últimos 12 meses, quantas vezes você foi internado(a)?');
    if(this.test.q2_estado_saude_A === 1) {
      this.pdfmake.addText('Resposta: ' + '0', 'resp');
    } else if(this.test.q2_estado_saude_A === 2) {
      this.pdfmake.addText('Resposta: ' + '1 a 3', 'resp');
    } else if(this.test.q2_estado_saude_A === 3) {
      this.pdfmake.addText('Resposta: ' + '3+', 'resp');
    }

    this.pdfmake.addText(' ');
    this.pdfmake.addText('<strong>Q2b)</strong> De modo geral, como você descreveria sua saúde?');
    if(this.test.q2_estado_saude_B === 1) {
      this.pdfmake.addText('Resposta: ' + 'Excelente', 'resp');
    } else if(this.test.q2_estado_saude_B === 2) {
      this.pdfmake.addText('Resposta: ' + 'Muito boa', 'resp');
    } else if(this.test.q2_estado_saude_B === 3) {
      this.pdfmake.addText('Resposta: ' + 'Boa', 'resp');
    } else if(this.test.q2_estado_saude_B === 4) {
      this.pdfmake.addText('Resposta: ' + 'Razoável', 'resp');
    } else if(this.test.q2_estado_saude_B === 5) {
      this.pdfmake.addText('Resposta: ' + 'Ruim', 'resp');
    }
    this.pdfmake.addText(' ');
    this.pdfmake.addText('Q3)</strong>Quantas das seguintes atividades o Sr(a) precisa de ajuda?');
    let list: string[];
    for(let indice of this.test.q3_ind_func) {
      list.push(this.activities[indice - 1]);
    }
    this.pdfmake.addOrderedList(list);

    this.pdfmake.addText(' ');
    this.pdfmake.addText('Q4)</strong>Quando você precisa de ajuda, você pode contar com a ajuda de alguém que atenda as suas necessidades?');
    if(this.test.q4_sup_social === 1) {
      this.pdfmake.addText('Resposta: ' + 'Sempre', 'resp');
    } else if(this.test.q4_sup_social === 2) {
      this.pdfmake.addText('Resposta: ' + 'As vezes', 'resp');
    } else if(this.test.q4_sup_social === 3) {
      this.pdfmake.addText('Resposta: ' + 'Nunca', 'resp');
    }
    this.pdfmake.addText(' ');
    this.pdfmake.addText('Q5a)</strong> Normalmente, você usa cinco ou mais remédios diferentes e receitados (pelo médico)?');
    if(this.test.q5_medicamento_A === 1) {
      this.pdfmake.addText('Resposta: ' + 'Sim', 'resp');
    } else if(this.test.q5_medicamento_A === 2) {
      this.pdfmake.addText('Resposta: ' + 'Não', 'resp');
    } 
    this.pdfmake.addText(' ');
    this.pdfmake.addText('Q5b)</strong> Algumas vezes você esquece de tomar seus remédios?');
    if(this.test.q5_medicamento_B === 1) {
      this.pdfmake.addText('Resposta: ' + 'Sim', 'resp');
    } else if(this.test.q5_medicamento_B === 2) {
      this.pdfmake.addText('Resposta: ' + 'Não', 'resp');
    } 
    this.pdfmake.addText(' ');
    this.pdfmake.addText('Q6)</strong> Recentemente, você tem perdido peso de forma que suas roupas estão mais folgadas?');
    if(this.test.q6_nutricao === 1) {
      this.pdfmake.addText('Resposta: ' + 'Sim', 'resp');
    } else if(this.test.q6_nutricao === 2) {
      this.pdfmake.addText('Resposta: ' + 'Não', 'resp');
    } 
    this.pdfmake.addText(' ');
    this.pdfmake.addText('Q7)</strong> Você se sente triste ou deprimido(a) com frequência?');
    if(this.test.q7_humor === 1) {
      this.pdfmake.addText('Resposta: ' + 'Sim', 'resp');
    } else if(this.test.q7_humor === 2) {
      this.pdfmake.addText('Resposta: ' + 'Não', 'resp');
    } 
    this.pdfmake.addText(' ');
    this.pdfmake.addText('Q8)</strong> Você tem problema de perder o controle da urina sem querer? (segurar urina?)');
    if(this.test.q8_continencia === 1) {
      this.pdfmake.addText('Resposta: ' + 'Sim', 'resp');
    } else if(this.test.q8_continencia === 2) {
      this.pdfmake.addText('Resposta: ' + 'Não', 'resp');
    } 
    this.pdfmake.addText(' ');
    this.pdfmake.addText('Q9)</strong> Gostaria que o(a) Sr(a) sentasse nessa cadeira com suas costas e braços relaxados. Agora levante, ande três metros e retorno a sentar.');
    if(this.test.q9_desemp_func === 1) {
      this.pdfmake.addText('Resposta: ' + '0-10 seg', 'resp');
    } else if(this.test.q9_desemp_func === 2) {
      this.pdfmake.addText('Resposta: ' + '11-20 seg', 'resp');
    } else if(this.test.q9_desemp_func === 3) {
      this.pdfmake.addText('Resposta: ' + '>20 seg', 'resp');
    } 
    this.pdfmake.addText('Tempo exato: ' + this.test.q9_desemp_func_tempo, 'resp');
    this.pdfmake.addText(' ');
    this.pdfmake.addText('Fatores a serem investigados', 'header');
    const fatoresCopy = Object.create(this.fatores);
    this.pdfmake.addOrderedList(fatoresCopy);
    this.pdfmake.download('avaliacao_subjetiva_'+this.patient.nome  );*/
  }
}
