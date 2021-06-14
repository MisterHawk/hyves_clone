import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  index: number = window.innerWidth >= 1200 ? 0 : 2;
  
  setIndex(id: number) {
    this.index = id
  }

  profileNavs: any[] = [
    { id: 0, type: "desktop", name: "PROFIEL" },
    { id: 1, type: "mobile", name: "INFO" },
    { id: 2, type: "mobile", name: "TIJDLIJN" },
    { id: 3, type: "", name: "MEDIA" },
    { id: 4, type: "", name: "VRIENDEN" }
  ];

  friends: any[] = [
    { id: 0, name: "TEST1" },
    { id: 1, name: "TEST2" },
    { id: 2, name: "TEST3" },
    { id: 3, name: "TEST4" },
    { id: 3, name: "TEST4" },
    { id: 3, name: "TEST4" },
    { id: 3, name: "TEST4" },
    { id: 3, name: "TEST4" },
  ];

  user = 'Hein Douwe';
  userTagline = 'Example tagline'
  loggedIn = true;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
