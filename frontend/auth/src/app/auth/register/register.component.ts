import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    formRegister = this.fb.group({
        'firstName': ['', [Validators.required]],
        'lastName': ['', [Validators.required]],
        'address': ['', [Validators.required]],
        'city': ['', [Validators.required]],
        'state': ['', [Validators.required]],
        'phone': ['', [Validators.required]],
        'mobilePhone': ['', [Validators.required]],
        'email': ['', [Validators.required, Validators.email]],
        'password1': ['', [Validators.required, Validators.minLength(6)]],
        'password2': ['', [Validators.required, Validators.minLength(6)]],

    }, { validator: this.matchingPasswords });

    states = ['MG', 'RS', 'SC', 'GO', 'PR', 'SP'];

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
    }

    matchingPasswords(group: FormGroup) {
        if (group) {
            const password1 = group.controls['password1'].value;
            const password2 = group.controls['password2'].value;
            if (password1 === password2) {
                return null;
            }
        }
        return { matching: false };
    }

    onSubmit(): void {

    }

}
