import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
import { AuthenticationService } from 'app/_services/authentication.service';
import { User } from '@models';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private httpClient: HttpClient,
        private authenticationService: AuthenticationService) {
    }
 
    getUsers(): Observable<User[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
 
        // get users from api
        return this.http.get('/api/users', options)
            .map((response: Response) => response.json());
    }
    
    public getUserById(userId: number): Observable<User> {
        return this.httpClient.get<User>(environment.baseUrl + 'users/' + userId + '/');
    }
}