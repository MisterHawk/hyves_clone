import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthButtonComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';

import { AuthModule } from '@auth0/auth0-angular';

const routes: Routes = [
  {path: 'timeline', component: TimelineComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: AuthButtonComponent},
  {path: 'account', component: AccountComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '', redirectTo: '/app', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    ProfileComponent,
    AuthButtonComponent,
    RegisterComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AuthModule.forRoot({
      domain: 'dev--4x0kppm.eu.auth0.com',
      clientId: 'O4eRDhDCAGEK7WGvYkw0L2l2iKr84fc1'
    }),
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
