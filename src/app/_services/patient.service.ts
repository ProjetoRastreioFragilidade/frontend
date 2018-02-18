import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Patient } from '@models';
@Injectable()
export class PatientService {

  constructor(
    private http: HttpClient
  ) { }

  public createPatient(patient: Patient): Observable<any> {
    return this.http.post<Patient>('http://localhost:8000/paciente/', patient);
  }
}
