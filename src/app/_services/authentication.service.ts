import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: HttpClient) {
        // set token if saved in local storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    public authenticate(username: string, password: string): Observable<any> {
        return this.http.post(environment.baseUrl + 'api-token-auth/', { username: username, password: password });
    }

    public logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('nro_sus');
        localStorage.removeItem('currentUser');
    }
}
