import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FirebaseAppModule, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { PostComponent } from './home/post/post.component';
import { CreatePostComponent } from './home/create-post/create-post.component';
import { UploadImageDialogComponent } from './dialogs/upload-image-dialog/upload-image-dialog.component';
import { CommentComponent } from './home/post/comment/comment.component';
import { ViewCommentComponent } from './home/post/comment/view-comment/view-comment.component';
import { NotificationComponent } from './components/notification/notification.component';
import { LogoutComponent } from './components/logout/logout.component';
import { TimeStampPipe } from './components/pipe/time-stamp.pipe';
import { ProfileComponent } from './components/profile/profile.component';
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegistrationComponent,
        HomeComponent,
        HeaderComponent,
        SidenavComponent,
        PostComponent,
        CreatePostComponent,
        UploadImageDialogComponent,
        CommentComponent,
        ViewCommentComponent,
        NotificationComponent,
        LogoutComponent,
        TimeStampPipe,
        ProfileComponent
    ],
    imports: [
        BrowserModule,
        MatFormFieldModule,
        AppRoutingModule,
        MatSelectModule,
        MatInputModule,
        ReactiveFormsModule,
        MatExpansionModule,
        MatToolbarModule,
        MatCardModule,
        FirebaseAppModule,
        MatListModule,
        MatButtonToggleModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatDialogModule,
        MatProgressBarModule,
        MatMenuModule,
        MatFormFieldModule,
        RouterModule,
        provideFirebaseApp(() => initializeApp({"projectId":"baratok-kozt","appId":"1:407555758074:web:a3e9c3ab915210a2b5b643","storageBucket":"baratok-kozt.appspot.com","apiKey":"AIzaSyCqgD1Oln_sVlrv_UDoDDK09PQOfmoKi30","authDomain":"baratok-kozt.firebaseapp.com","messagingSenderId":"407555758074"})),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore())
    ],
    providers: [provideAnimations()],
    bootstrap: [AppComponent],
})
export class AppModule {}