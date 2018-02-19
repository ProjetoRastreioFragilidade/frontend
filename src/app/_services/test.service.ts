import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment.prod';
import { Test, Subjective } from '@models';

@Injectable()
export class TestService {

  constructor(
    private http: HttpClient
  ) { }


  public findByPatientId(patientId: number): Observable<Test[]> {
    return this.http.get<Test[]>(environment.baseUrl + 'avaliacoes/' + patientId + '/');
  }

  public subjective(subjective: Subjective): Observable<Subjective> {
    return this.http.post<Subjective>(environment.baseUrl + 'subjetiva/', subjective);
  }
  public findTestById(testId: number): Observable<Subjective> {
    return this.http.get<Subjective>(environment.baseUrl + 'subjetiva/' + testId + '/');
  }
  
}
