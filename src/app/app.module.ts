import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';

// Angular
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';

const routes: Routes = [
  { path: 'timeline', component: TimelineComponent },
  { path: 'account', component: AccountComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: '', redirectTo: '/app', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    ProfileComponent,
    AccountComponent,
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
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
