import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '@services';
import { Patient } from '@models';
import * as moment from 'moment';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.scss']
})
export class RegisterPatientComponent implements OnInit {

  public patient: Patient = {
    nome: '',
    nro_sus: '',
    data_nascimento: '',
    end_bairro: '',
    end_rua: '',
    end_numero: null,
    cep: '',
    posto: 1
  };

  public successCreated = false;
  public nomePatient: string;
  public errorMessage = '';

  public inputDate: string;
  
  constructor(
    private router: Router,
    private patientService: PatientService
  ) { }

  ngOnInit() {
  }

  public back() {
    this.router.navigate(['/']); 
  }

  public submit() {
    this.errorMessage = '';
    this.successCreated = false;
    console.log(moment(this.patient.data_nascimento, "DDMMYYYY"))
    this.patient.data_nascimento = this.getInputDate();

    if (!this.patient.nome) {
      this.errorMessage = 'Nome inválido';
      return;
    }
    if (!this.patient.nro_sus || this.patient.nro_sus.length < 15) {
      this.errorMessage = 'Número do SUS inválido';
      return;
    }
    if (!this.patient.data_nascimento || this.patient.data_nascimento.length < 10) {
      this.errorMessage = 'Data de nascimento inválida';
      return;
    }
    if (this.patient.cep && this.patient.cep.length < 8) {
      this.errorMessage = 'CEP inválido';
      return;
    }
  
    this.patientService.createPatient(this.patient).subscribe(res => {
      console.log(res);     
      this.successCreated = true;
      this.nomePatient = this.patient.nome;
      this.patient = {
        nome: '',
        nro_sus: '',
        data_nascimento: '',
        end_bairro: '',
        end_rua: '',
        end_numero: null,
        cep: '',
        posto: 1
      };
    }, err => {
      this.errorMessage = err.error[Object.keys(err.error)[0]][0] + ': ' + Object.keys(err.error)[0];
    })
  }

  public getInputDate(): string {
    if (this.inputDate) {
        const date = this.inputDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1');
        return date;
    }
    return null;
  }
}
