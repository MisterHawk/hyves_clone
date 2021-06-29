import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-make-post',
  templateUrl: './make-post.component.html',
  styleUrls: ['./make-post.component.css']
})
export class MakePostComponent implements OnInit {

  form: FormGroup;
  constructor(public fb: FormBuilder, private api: ApiService) {
    this.form = this.fb.group({
      content: [''],
      image: File
    })
  }

  uploadFile(event: Event){
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({
      image: file
    });
    this.form.get('image')!.updateValueAndValidity()
  }

  submitForm() {
    var formData: any = new FormData();
    formData.append("user_id", localStorage.getItem('id')!);
    formData.append("content", this.form.get('content')!.value);
    formData.append("image", this.form.get('image')!.value);
    this.api.makePost(formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }

  ngOnInit(): void {
  }

}
