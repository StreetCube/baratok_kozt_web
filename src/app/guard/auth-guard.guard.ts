import { Inject } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, GuardResult, MaybeAsync } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return new Promise<GuardResult>((resolve) => {
    const auth: Auth = Inject(Auth);
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};
