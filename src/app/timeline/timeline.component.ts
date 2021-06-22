import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Profile } from '../profile';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
