import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ApiService } from '../api.service';
import { Profile } from '../profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  index: number = window.innerWidth >= 1200 ? 0 : 2;
  id: string = "";
  profile: Profile = new Profile;
  friends: any[] = [];

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
  
  loggedIn = true;

  constructor(public auth: AuthService, private apiService: ApiService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.id = params.get('id')!
      }
    )

    this.apiService.readUser(this.id).subscribe((profile: Profile) => {
      this.profile = profile;
    })

    this.apiService.readFriends(this.id).subscribe((profiles: Profile[]) => {
      for (let i in profiles) {
        this.friends.push({
          id: profiles[i]['id'],
          first_name: profiles[i]['first_name'],
          last_name: profiles[i]['last_name'],
          username: profiles[i]['username'],
          picture_url: profiles[i]['picture_url'],
          user_bio: profiles[i]['user_bio']
        });
      }
      console.log(this.friends);
    })
  }

}
