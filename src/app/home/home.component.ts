import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { TitleService } from '../title.service';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faSignInAlt = faSignInAlt;

  constructor(private readonly titleService: TitleService, private router: Router, public auth: AuthService) {
    this.titleService.setDefaultTitle();
  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated$.subscribe(x => {
      if (x) this.router.navigate(['register']);
    })) {
    }
  }

}
