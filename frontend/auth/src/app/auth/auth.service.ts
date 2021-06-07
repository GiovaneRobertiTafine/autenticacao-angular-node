import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    readonly url = 'http://localhost:3000/auth';
    private subUser$: BehaviorSubject<User> = new BehaviorSubject(null);
    private subLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private http: HttpClient) { }

    register(user: User): Observable<User> {
        return this.http.post<User>(`${this.url}/register`, user);
    }

    login(credentials: { email: string, password: string; }): Observable<User> {
        return this.http.post<User>(`${this.url}/login`, credentials)
            .pipe(
                tap((u: User) => {
                    this.setToken(u);
                    this.subLoggedIn$.next(true);
                    this.subUser$.next(u);
                })
            );
    }

    isAuthenticated(): Observable<boolean> {
        const token = this.getToken();
        if (token && !this.subLoggedIn$.value) {
            return this.checkTokenValidation();
        }
        return this.subLoggedIn$;
    }

    checkTokenValidation(): Observable<boolean> {
        return this.http.get<User>(`${this.url}/user`)
            .pipe(
                tap(
                    (u: User) => {
                        if (u) {
                            this.setToken(u);
                            this.subLoggedIn$.next(true);
                            this.subUser$.next(u);
                        }
                    }
                ),
                map((u: User) => (u) ? true : false),
                catchError((err) => {
                    this.logout();
                    this.subLoggedIn$.next(false);
                    this.subUser$.next(null);
                    return of(false);
                })
            );
    }

    getUser(): Observable<User> {
        return this.subUser$;
    }

    logout(): void {
        localStorage.removeItem('token');
        console.log('logout');
        this.subLoggedIn$.next(false);
        this.subUser$.next(null);
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    setToken(u: User): void {
        localStorage.setItem('token', u.token);
    }
}
