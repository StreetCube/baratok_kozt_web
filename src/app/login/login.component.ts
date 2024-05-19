import { Component, OnDestroy } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { Subject, takeUntil } from 'rxjs';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    private destroy$ = new Subject<void>();

    loginError: string = '';
    message: string = '';
    successLogin: boolean = false;
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    constructor(private router: Router, private auth: Auth, private authService: AuthService) {}

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

     login() {
                const email = this.loginForm.get('email')?.value;
        if (!email) {
            this.loginError = 'Email is required';
            return;
        }
        const password = this.loginForm.get('password')?.value;
        if (!password) {
            this.loginError = 'Password is required';
            return;
        }

        this.authService.login(email, password).then((data) => {
            localStorage.setItem('user', JSON.stringify(data));
            this.message = 'Login successful';
            this.loginError = '';
            this.successLogin = true;
        }).catch((err) => {
            this.loginError = 'Something went wrong';
            this.message = '';
        })
    }

    navigateToHome() {
        this.router.navigate(['/home']);
    }

    toRegister() {
        this.router.navigate(['/registration']);
    }





    // private destory$ = new Subject<void>();

    // loginError: string = '';
    // message: string = '';
    // successLogin: boolean = false;
    // loginForm: FormGroup = new FormGroup({
    //     username: new FormControl('', [Validators.required]),
    //     password: new FormControl('', [Validators.required]),
    // });

    // console = console;

    // constructor(private userService: UserService, private router: Router) {}

    // ngOnDestroy() {
    //     this.destory$.next();
    //     this.destory$.complete();
    // }

    // login() {
    //     const username = this.loginForm.get('username')?.value;
    //     if (!username) {
    //         this.loginError = 'Username is required';
    //         return;
    //     }
    //     const password = this.loginForm.get('password')?.value;
    //     if (!password) {
    //         this.loginError = 'Password is required';
    //         return;
    //     }

    //     this.userService
    //         .login({ username: username, password: password })
    //         .pipe(takeUntil(this.destory$))
    //         .subscribe({
    //             next: (data) => {
    //                 localStorage.setItem('user', JSON.stringify(data));
    //                 this.userService.refreshCurrentUser();
    //                 if (username === 'admin') {
    //                     localStorage.setItem('admin', 'true');
    //                 } else {
    //                     localStorage.removeItem('admin');
    //                 }
    //                 this.message = 'Login successful';
    //                 this.loginError = '';
    //                 this.successLogin = true;
    //                 setTimeout(() => {
    //                     this.navigateToHome();
    //                 }, 2000);
    //             },
    //             error: (err) => {
    //                 this.loginError = 'Something went wrong';
    //                 this.message = '';
    //             },
    //         });
    // }
}
