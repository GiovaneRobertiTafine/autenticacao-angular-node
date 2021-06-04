import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
                    localStorage.setItem('token', u.token);
                    this.subLoggedIn$.next(true);
                    this.subUser$.next(u);
                })
            );
    }

    isAuthenticated(): Observable<boolean> {
        return this.subLoggedIn$;
    }

    getUser(): Observable<User> {
        return this.subUser$;
    }

    logout(): void {
        localStorage.removeItem('token');
        this.subLoggedIn$.next(false);
        this.subUser$.next(null);
    }

    getToken(): string {
        return localStorage.getItem('token');
    }
}
