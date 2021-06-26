import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ApiService } from '../api.service';
import { Profile } from '../profile';
import { Title } from '@angular/platform-browser';
import { faUserCog, faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  index: number;
  id: string;
  profile: Profile;
  friends: any[];
  friend_status: Status;
  // Icons
  faUserCog = faUserCog;
  faUserPlus = faUserPlus;
  faUserMinus = faUserMinus;

  constructor(public auth: AuthService, private apiService: ApiService, private router: Router, private route: ActivatedRoute, private readonly titleService: Title) {
    this.index = this.resetIndex()
    this.id = "";
    this.profile = new Profile;
    this.friends = [];
    this.friend_status = Status.Default;
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!
    })
    // TODO: remove this
    localStorage.setItem('id', '1')
   }

  setIndex(id: number): void {
    this.index = id
  }

  resetIndex(): number {
    return window.innerWidth >= 1200 ? 0 : 2;
  }

  addFriend(): void {
    // TODO: send request to apiservice
    this.friend_status = Status.Added;
    this.logFriendStatus();
  }

  removeFriend(): void {
    // TODO: send  request to apiservice
    this.friend_status = Status.Removed;
    this.logFriendStatus();
  }

  logFriendStatus(): void {
    console.log("User(" + this.id + ") " + Status[this.friend_status]);
  }

  // TODO: this.friends refers to current profile's friends. Not the friends of the logged in user.
  // Send get request instead to retreive if logged in user is friends with current id
  checkFriends(id: string): boolean {
    return this.friends.find(x => x.id == id) != null ? true : false;
  }

  checkId(): boolean {
    return localStorage.getItem('id') == this.id;
  }

  profileNavs: any[] = [
    { id: 0, type: "desktop", name: "PROFIEL" },
    { id: 1, type: "mobile", name: "INFO" },
    { id: 2, type: "mobile", name: "TIJDLIJN" },
    { id: 3, type: "", name: "MEDIA" },
    { id: 4, type: "", name: "VRIENDEN" }
  ];
  
  ngOnInit(): void {
    this.apiService.readUser(this.id).subscribe((profile: Profile) => {
      this.profile = profile;
    })

    this.apiService.readFriends(this.id).subscribe((profiles: Profile[]) => {
      for (let i in profiles) {
        this.friends.push({
          id: profiles[i]['id'],
          first_name: profiles[i]['first_name'],
          last_name: profiles[i]['last_name'],
          picture_url: profiles[i]['picture_url'],
          user_bio: profiles[i]['user_bio'],
          gender: profiles[i]['gender'],
          birthday: profiles[i]['birthday'],
          join_date: profiles[i]['user_bio']
        });
      }
    })
  
    this.titleService.setTitle(this.profile.first_name + " " + this.profile.last_name)
  }
}

enum Status {
  Default = 0,
  Added = 1,
  Removed = 2
}
