import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Post } from '../post';
import { Profile } from '../profile';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})

export class PostsComponent implements OnInit {

  posts: Post[];
  profile: Profile;
  id: string;
  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.posts = [];
    this.profile = new Profile;
    this.id = '';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    })
    this.api.getPostUser(this.id).subscribe((post: Post[]) => {
      this.api.readUser(this.id).subscribe((profile: Profile) => {
        for (let i in post) {
          this.posts.push({
            post_id: post[i]['post_id'],
            user_id: post[i]['user_id'],
            image_url: post[i]['image_url'],
            content: post[i]['content'],
            date: post[i]['date'],
            first_name: profile['first_name'],
            picture_url: profile['picture_url']
          });
        }
      })
    })
    console.log(this.posts);
  }
}
