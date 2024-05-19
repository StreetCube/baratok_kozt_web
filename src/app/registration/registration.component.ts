import { Component, Input } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { doc, getFirestore, setDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  DocumentReference,
  Firestore,
  addDoc,
  collection,
} from 'firebase/firestore';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  private destroy$ = new Subject<void>();

  error: string = '';
  message: string = '';
  successLogin: boolean = false;
  registrateForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private auth: Auth) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  register() {
    const email = this.registrateForm.get('email').value;
    const password = this.registrateForm.get('password').value;
    const firstName = this.registrateForm.get('firstName').value;
    const lastName = this.registrateForm.get('lastName').value;
    const birthDate = this.registrateForm.get('birthDate').value;
    if (!email || !password || !firstName || !lastName || !birthDate) {
      this.error = 'All fields are required';
      return;
    }
    createUserWithEmailAndPassword(
      this.auth,
      this.registrateForm.get('email')?.value,
      this.registrateForm.get('password')?.value
    )
      .then((result) => {
        this.message = 'Registration successful';
        this.error = '';
        this.successLogin = true;
        const userCollection = collection(getFirestore(), 'users');
        setDoc(doc(userCollection, result.user.uid), {
          email: email,
          firstName: firstName,
          lastName: lastName,
          birthDate: birthDate,
          notifications: [],
        })
          .then(() => {
            localStorage.setItem('user', result.user.uid);
            updateProfile(result.user, {
              displayName: firstName + ' ' + lastName,
            })
              .then(() => {
                setTimeout(() => {
                  this.navigateToHome();
                }, 2000);
              })
              .catch((error) => {
                this.error = 'Something went wrong: ' + error.message;
              });
          })
          .catch((error) => {
            this.error = 'Something went wrong: ' + error.message;
          });
      })
      .catch((error) => {
        this.error = 'Something went wrong: ' + error.message;
      });
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  toLogin() {
    this.router.navigate(['/login']);
  }

  // private destroy$ = new Subject<void>();

  // @Input() autoLogin: boolean = true;

  // message: string = '';
  // error: string = '';
  // successLogin: boolean = false;
  // registrateForm: FormGroup = new FormGroup({
  //     username: new FormControl('', [Validators.required]),
  //     password: new FormControl('', [
  //         Validators.required,
  //         Validators.minLength(6),
  //     ]),
  //     firstName: new FormControl('', [Validators.required]),
  //     lastName: new FormControl('', [Validators.required]),
  //     birthDate: new FormControl('', [Validators.required]),
  //     confirmPassword: new FormControl('', [
  //         Validators.required,
  //         Validators.minLength(6),
  //     ]),
  // });

  // constructor(private userService: UserService, private router: Router) {}

  // ngOnDestroy() {
  //     this.destroy$.next();
  //     this.destroy$.complete();
  // }

  // register() {
  //     const user = {
  //         username: this.registrateForm.get('username')?.value,
  //         password: this.registrateForm.get('password')?.value,
  //         firstName: this.registrateForm.get('firstName')?.value,
  //         lastName: this.registrateForm.get('lastName')?.value,
  //         birthDate: this.registrateForm.get('birthDate')?.value,
  //         confirmPassword: this.registrateForm.get('confirmPassword')?.value,
  //     };
  //     if (
  //         !user.username ||
  //         !user.password ||
  //         !user.firstName ||
  //         !user.lastName ||
  //         !user.birthDate ||
  //         !user.confirmPassword
  //     ) {
  //         this.error = 'All fields are required';
  //         return;
  //     }
  //     //password do not match
  //     if (user.password !== user.confirmPassword) {
  //         this.error = 'Passwords do not match';
  //         return;
  //     }

  //     this.userService
  //         .registrate(user)
  //         .pipe(takeUntil(this.destroy$))
  //         .subscribe({
  //             next: (data) => {
  //                 if (this.autoLogin) {
  //                     localStorage.setItem('user', JSON.stringify(data));
  //                     if (user.username === 'admin') {
  //                         localStorage.setItem('admin', 'true');
  //                     } else {
  //                         localStorage.removeItem('admin');
  //                     }
  //                 }

  //                 this.message = 'Registration successful';
  //                 this.error = '';
  //                 this.successLogin = true;
  //                 this.userService.refreshCurrentUser()
  //                 setTimeout(() => {
  //                     this.navigateToHome();
  //                 }, 2000);
  //             },
  //             error: (err) => {
  //                 this.error = 'Something went wrong';
  //                 this.message = '';
  //             },
  //         });
  // }

  // navigateToHome() {
  //     this.router.navigate(['/home']);
  // }

  // toLogin() {
  //     this.router.navigate(['/login']);
  // }
}
