import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  constructor(private auth: AuthService, private api: ApiService, private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      bio: ['', Validators.required],
      gender: ['', Validators.required],
      image: File
    })
   }

  ngOnInit(): void {
    if (localStorage.getItem('id') === null) {
      this.auth.user$.subscribe(user => {
        this.api.checkUserEmail(user?.email!).subscribe(
          (response) => { 
            if(response !== null){
            this.router.navigate(['/timeline']);
            }
          },
          (error) => console.log(error)
        )
      })
      this.auth.user$.subscribe(user => {
        this.form.patchValue({
          email: user?.email!
        })
      })
    } else {
      this.router.navigate(['/timeline']);
    }
    this.form.controls['gender'].setValue("Onbekend");
  }

  uploadFile(event: Event){
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({
      image: file
    });
    this.form.get('image')!.updateValueAndValidity()
  }

  submitForm(){
    if (this.form.status === 'VALID') {
      var formData: any = new FormData();
      formData.append("email", this.form.get('email')!.value);
      formData.append("first_name", this.form.get('first_name')!.value);
      formData.append("last_name", this.form.get('last_name')!.value);
      formData.append("user_bio", this.form.get('bio')!.value)
      formData.append("gender", this.form.get('gender')!.value)
      formData.append("image", this.form.get('image')!.value);
      this.api.createUser(formData).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      )
      this.router.navigate(['/timeline']);
    }
  }
}