import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log(this.authService.getToken());
        if (this.authService.getToken()) {
            let token = this.authService.getToken();
            const authReq = req.clone({
                setHeaders: {
                    Authorization: token
                }
            });
            return next.handle(authReq)
                .pipe(
                    catchError((err) => {
                        console.log(err);
                        if (err instanceof HttpErrorResponse) {
                            if (err.status === 401) {
                                this.authService.logout();
                                this.router.navigateByUrl('/auth/login');
                            }
                        }
                        return throwError(err);
                    })
                );
        }
        return next.handle(req);
    }
}