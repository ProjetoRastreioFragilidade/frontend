import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Posto } from '@models';
import { PostoService, SharedService } from '@services';

@Component({
  selector: 'app-register-health-center',
  templateUrl: './register-health-center.component.html',
  styleUrls: ['./register-health-center.component.scss']
})
export class RegisterHealthCenterComponent implements OnInit {
  // public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskTel = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskCEP = [/[1-9]/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public maskNro = [/[1-9]/, /\d/, /\d/, /\d/];
  
  public posto: Posto = {
    nome: '',
    end_rua: '',
    end_bairro: '',
    end_numero: null,
    cep: '',
    telefone: ''
  };

  public successCreated = false;
  public errorMessage: string;
  public nomePosto: string;

  constructor(
    private router: Router,
    private postoService: PostoService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
  }

  public back() {
    this.router.navigate(['/']); 
  }

  public submit() {
    this.errorMessage = '';
    this.successCreated = false;
    this.posto.cep = this.posto.cep.replace(/\D+/g, '');
    this.posto.end_numero = +(''+this.posto.end_numero).replace(/\D+/g, '');
    this.posto.telefone = this.posto.telefone.replace(/\D+/g, '');

    if (!this.posto.nome) {
      this.errorMessage = 'Nome inválido';
      return;
    }
    if (!this.posto.end_rua) {
      this.errorMessage = 'Endereço inválido';
      return;
    }
    if (!this.posto.end_bairro) {
      this.errorMessage = 'Bairro inválido';
      return;
    }
    if (!this.posto.end_numero) {
      this.errorMessage = 'Número inválido';
      return;
    }
    if (!this.posto.cep || this.posto.cep.length < 8) {
      this.errorMessage = 'CEP inválido';
      return;
    }
    if (!this.posto.telefone || this.posto.telefone.length < 10) {
      this.errorMessage = 'Número de telefone inválido';
      return;
    }
    this.sharedService.startBlockUI();
    this.postoService.createPosto(this.posto).subscribe(res => {
      console.log(res);     
      this.successCreated = true;
      this.nomePosto = this.posto.nome;
      this.posto = {
        nome: '',
        end_rua: '',
        end_bairro: '',
        end_numero: null,
        cep: '',
        telefone: ''
      };
      this.sharedService.stopBlockUI();
    }, err => {
      // TODO Ver se é assim que ele vai retornar o erro
      this.errorMessage = err.msg;
      console.log(err);
      this.sharedService.stopBlockUI();
    })
  }

}
