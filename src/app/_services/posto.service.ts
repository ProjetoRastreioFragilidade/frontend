import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Posto } from '@models';
 
@Injectable()
export class PostoService {

  constructor(
    private http: HttpClient
  ) { }

  public createPosto(posto: Posto): Observable<any> {
    return this.http.post<Posto>('http://localhost:8000/posto/', posto);
  }
}
