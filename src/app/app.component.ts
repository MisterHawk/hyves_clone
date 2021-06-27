import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { faSignOutAlt, faUserCog, faUserAlt, faStream, faSignInAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root, app-auth-button',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isMenuCollapsed = true;
  // Icons
  faSignOutAlt = faSignOutAlt;
  faUserCog = faUserCog;
  faUserAlt = faUserAlt;
  faStream = faStream;
  faSignInAlt = faSignInAlt;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService
  ) {}
}
