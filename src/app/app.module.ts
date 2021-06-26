import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './register/register.component';

// Angular
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor, AuthGuard, AuthModule } from '@auth0/auth0-angular';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: 'timeline', component: TimelineComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/app', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    ProfileComponent,
    AccountComponent,
    SettingsComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule.forRoot({
      // The domain and clientId
      domain: 'dev--4x0kppm.eu.auth0.com',
      clientId: 'O4eRDhDCAGEK7WGvYkw0L2l2iKr84fc1',
      // Request this audience at user authentication time
      audience: 'https://dev--4x0kppm.eu.auth0.com/api/v2/',

      // Request this scope at user authentication time
      scope: 'read:current_user',

      // Specify configuration for the interceptor
      httpInterceptor: {
        allowedList: [
          {
            // Match any request that starts 'https://dev--4x0kppm.eu.auth0.com/api/v2/' (note the asterisk)
            uri: 'https://dev--4x0kppm.eu.auth0.com/api/v2/*',
            tokenOptions: {
              // The attached token should target this audience
              audience: 'https://dev--4x0kppm.eu.auth0.com/api/v2/',

              // The attached token should have these scopes
              scope: 'read:current_user',
            },
          },
        ],
      },
    }),
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    FontAwesomeModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
