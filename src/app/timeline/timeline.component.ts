import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Post } from '../post';
import { Profile } from '../profile';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  posts: Post[];
  constructor(private api: ApiService) { 
    this.posts = [];
  }

  ngOnInit(): void {
    this.api.getPostsTimeline(localStorage.getItem('id')!).subscribe((post: Post[]) => {
        for (let i in post) {
          this.api.readUser(post[i]['user_id']).subscribe((profile: Profile) => {
            this.posts.push({
              post_id: post[i]['post_id'],
              user_id: post[i]['user_id'],
              image_url: post[i]['image_url'],
              content: post[i]['content'],
              date: post[i]['date'],
              first_name: profile['first_name'],
              picture_url: profile['picture_url']
            });
          })
        }
    })
  }

}
