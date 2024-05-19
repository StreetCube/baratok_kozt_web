import { Injectable } from '@angular/core';
import { Auth, UserCredential, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from '@angular/fire/auth';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authStateChanged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(getAuth().currentUser ? true : false);

  constructor(private auth: Auth) { this.getAuthStateObservable() }

  async login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(getAuth(), email, password).then((userCredential) => {
      this.authStateChanged$.next(true);
      return userCredential;
    }).catch((error) => {
      throw error;
    })
  }

  getUser() {
    return getAuth().currentUser;
  }

  async logout() {
    await getAuth().signOut();
    // this.authStateChanged$.next(false);
  }

  getAuthStateObservable() {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        this.authStateChanged$.next(true);
      } else {
        this.authStateChanged$.next(false);
    }

    },(error) => {
      console.log(error)
      // this.authStateChanged$.next(false);
    })
}
}
