import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReportService {

  constructor(
    private http: HttpClient
  ) { }

  public getReport(healthCenter: string): Observable<any> {
      return this.http.get<any>(environment.baseUrl + 'relatorio/geral/' + healthCenter);
  }
}
