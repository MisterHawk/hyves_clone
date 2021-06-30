import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { ApiService } from '../api.service';
import { Profile } from '../profile';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  form: FormGroup;
  profile: Profile;
  constructor(private auth: AuthService, private api: ApiService, private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      first_name: [''],
      last_name: [''],
      bio: [''],
      gender: [''],
      image: File
    })
    this.profile = new Profile;
   }
  ngOnInit(): void {
    this.api.readUser(localStorage.getItem('id')!).subscribe((profile: Profile) => {
      this.profile = profile;
    })
  }

uploadFile(event: Event){
  const file = (event.target as HTMLInputElement).files![0];
  this.form.patchValue({
    image: file
  });
  this.form.get('image')!.updateValueAndValidity()
}


submitForm(){
  var formData: any = new FormData();
  formData.append("id", localStorage.getItem('id'));
  formData.append("first_name", this.form.get('first_name')!.value);
  formData.append("last_name", this.form.get('last_name')!.value);
  formData.append("user_bio", this.form.get('bio')!.value)
  formData.append("gender", this.form.get('gender')!.value)
  formData.append("image", this.form.get('image')!.value);
  this.api.updateUser(formData).subscribe(
    (response) => console.log(response),
    (error) => console.log(error)
  )
}
}