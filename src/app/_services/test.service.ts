import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment.prod';
import { Test } from '@models';

@Injectable()
export class TestService {

  constructor(
    private http: HttpClient
  ) { }


  public findByPatientId(patientId: number): Observable<Test[]> {
    return this.http.get<Test[]>(environment.baseUrl + 'avaliacoes/' + patientId + '/');
  }
}
