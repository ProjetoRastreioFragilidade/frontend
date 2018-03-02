import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadService {

  constructor(
    private http: HttpClient
  ) { }

  public upload(formData: FormData):  Observable<any> {
    return this.http.post<FormData>(environment.baseUrl + 'upload/', formData);
  }

}
