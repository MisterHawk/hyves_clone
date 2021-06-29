import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settingsForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    birthday: new FormControl(''),
    bio: new FormControl(''),
  });
  constructor() { }

  ngOnInit(): void {
  }
}
