import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Patient } from '@models';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class PatientService {

  constructor(
    private http: HttpClient
  ) { }

  public createPatient(patient: Patient): Observable<any> {
    return this.http.post<Patient>(environment.baseUrl + 'paciente/', patient);
  }

  public findBySUSNumber(susNumber: string): Observable<Patient> {
    return this.http.get<Patient>(environment.baseUrl + 'busca/' + susNumber + '/');
  }
  
}
