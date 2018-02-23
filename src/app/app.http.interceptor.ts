import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

    private authUser;

    constructor(
        private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.authUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.authUser) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'JWT ' + this.authUser.token
                }
            });
        }

        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // Success nothing TODO
            }
        }, (err: any) => {
            if (!(this.router.url.indexOf('login') > - 1)) {
                if (err instanceof HttpErrorResponse) {
                    switch (err.status) {
                        case 401: {
                            localStorage.clear();
                            this.router.navigate(['login']);
                            location.reload();
                            break;
                        }
                        default: {
                            // TODO mensagemErro
                            break;
                        }
                    }
                }
            }
        });
    }
}