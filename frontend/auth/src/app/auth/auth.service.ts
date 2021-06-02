import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    readonly url = 'http://localhost:3000/auth';

    constructor(private http: HttpClient) { }

    register(user: User): Observable<User> {
        return this.http.post<User>(`${this.url}/register`, user);
    }
}
