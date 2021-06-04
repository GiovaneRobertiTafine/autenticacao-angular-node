import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup = this.fb.group({
        'email': ['', [Validators.required, Validators.email]],
        'password': ['', [Validators.required, Validators.minLength(6)]]
    });

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
    }

    public onSubmit(): void {
        const credentials = this.loginForm.value;
        this.authService.login(credentials)
            .subscribe(
                (response) => {
                    console.log(response);
                    this.snackBar.open(
                        'Logado com sucesso, Bem vindo ' + response.firstName,
                        'OK',
                        { duration: 2000, panelClass: 'success' }
                    );
                    this.router.navigateByUrl('/');
                },
                (error) => {
                    console.log(error);
                    this.snackBar.open(
                        'Usuário não encontrado',
                        'OK',
                        { duration: 2000, panelClass: 'error' }
                    );
                }
            );
    }

}
