import { Component, OnInit } from '@angular/core';
import { TitleService } from '../title.service';
import { Router } from '@angular/router';
import { faUserPlus, faUserMinus, faTimesCircle, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

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

  notifications = [
    { id: '0', first_name: 'Wytze', last_name: 'Kampen', picture_url: 'https://i.redd.it/7b5ig5kuo59y.jpg' },
    { id: '1', first_name: 'Hein Douwe', last_name: 'Havik', picture_url: 'https://i.redd.it/7b5ig5kuo59y.jpg' },
    { id: '2', first_name: 'Marthijn', last_name: 'Eisses', picture_url: 'https://i.redd.it/7b5ig5kuo59y.jpg' }
  ]

  declineFriend(index: number, id: string): void {
    // TODO: decline request
    this.clearNotification(index);
  }

  acceptFriend(index: number, id: string): void {
    // TODO: accept request
    this.clearNotification(index);
  }

  getNotifications() {
    // TODO: get request from api
  }

  clearNotification(index: number): void {
    this.notifications.splice(index, 1);
  }

  constructor(private router: Router, private readonly titleService: TitleService) {
    if (this.router.url === '/messages') {
      this.titleService.setTitle("Berichten")
    }
  }

  ngOnInit(): void { }

}
