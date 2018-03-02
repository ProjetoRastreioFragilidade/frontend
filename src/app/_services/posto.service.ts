import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Posto } from '@models';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class PostoService {

  constructor(
    private http: HttpClient
  ) { }

  public createPosto(posto: Posto): Observable<any> {
    return this.http.post<Posto>(environment.baseUrl + 'posto/', posto);
  }
  public listPosto(): Observable<Posto[]> {
    return this.http.get<Posto[]>(environment.baseUrl + 'posto/');
  }
}
