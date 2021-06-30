import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ApiService } from '../api.service';
import { Profile } from '../profile';
import { faUserCog, faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { TitleService } from '../title.service';

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

  constructor(public auth: AuthService, private apiService: ApiService, private router: Router, private route: ActivatedRoute, private readonly titleService: TitleService) {
    this.index = this.resetIndex()
    this.id = "";
    this.profile = new Profile;
    this.friends = [];
    this.friend_status = Status.Default;
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    })
   }

  setIndex(index: number): void {
    this.index = index;
  }

  resetIndex(): number {
    return window.innerWidth >= 1200 ? 0 : 2;
  }

  canMakePost(): boolean {
    return localStorage.getItem('id') === this.id;
  }

  sendPostMessage(): void {
    var postdata: FormData = new FormData();
    postdata.append("id", localStorage.getItem('id')!)
    postdata.append("id2", this.id);
    this.apiService.addFriend(postdata).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }

  addFriend(): void {
    this.sendPostMessage();
    this.friend_status = Status.Added;
  }

  removeFriend(): void {
    this.sendPostMessage();
    this.friend_status = Status.Removed;
    this.clearFriend(localStorage.getItem('id')!);
  }

  clearFriend(id: string) {
    if (this.checkFriends()) {
      this.friends.splice(this.friends.findIndex(x => x.id === id), 1);
    }
  }

  checkFriends(): boolean {
    return this.friends.find(x => x.id == localStorage.getItem('id')) != null ? true : false;
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
      this.titleService.setTitle(this.profile.first_name + " " + this.profile.last_name)
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
          date_created: profiles[i]['date_created']
        });
      }
    })
  }
}

enum Status {
  Default = 0,
  Added = 1,
  Removed = 2
}
