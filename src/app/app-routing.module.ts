import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { NotificationComponent } from './components/notification/notification.component';
import { authGuardGuard } from './guard/auth-guard.guard';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },  
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent,canActivate: [authGuardGuard]},
  { path: 'registration', component: RegistrationComponent },
  {path: 'notifications', component: NotificationComponent, canActivate: [authGuardGuard]},
  {path: 'logout',component: LogoutComponent, canActivate: [authGuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
