import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  faHome = faHome;

  constructor(private readonly titleService: TitleService) {
    this.titleService.setDefaultTitle();
  }

  ngOnInit(): void {
  }
}
