import { Component, OnInit } from '@angular/core';
import { TitleService } from '../title.service';
import { Router } from '@angular/router';
import { faUserPlus, faUserMinus, faTimesCircle, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../api.service';
import { Profile } from '../profile';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  // Icons
  faUserPlus = faUserPlus;
  faUserMinus = faUserMinus;
  faTimesCircle = faTimesCircle;
  faSyncAlt = faSyncAlt;

  notifications: any[];

  preparePostMessage(id: string): FormData {
    var postdata: FormData = new FormData();
    postdata.append("id", localStorage.getItem('id')!)
    postdata.append("id2", id);
    return postdata;
  }

  declineFriend(index: number, id: string): void {
    var postdata: FormData = this.preparePostMessage(id);
    postdata.append("reply", '0');
    this.api.requestReply(postdata).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
    )
    this.clearNotification(index);
  }

  acceptFriend(index: number, id: string): void {
    var postdata: FormData = this.preparePostMessage(id);
    postdata.append("reply", '1');
    this.api.requestReply(postdata).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
    )
    this.clearNotification(index);
  }

  getNotifications() {
    this.api.readRequests('1').subscribe((profiles: Profile[]) => {
      for (let i in profiles) {
        this.notifications.push({
          id: profiles[i]['id'],
          first_name: profiles[i]['first_name'],
          last_name: profiles[i]['last_name'],
          picture_url: profiles[i]['picture_url']
        });
      }
    })
  }

  clearNotification(index: number): void {
    this.notifications.splice(index, 1);
  }

  constructor(private router: Router, private readonly titleService: TitleService, private api: ApiService) {
    if (this.router.url === '/messages') {
      this.titleService.setTitle("Berichten")
    }
    this.notifications = [];
  }

  ngOnInit(): void { 
    this.getNotifications();
  }

}
