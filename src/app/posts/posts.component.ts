import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { POSTS } from '../mock-posts';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})

export class PostsComponent implements OnInit {

  msg!:string;

  posts = POSTS;

  constructor() {}

  postInput(){
    this.msg='Button is Clicked';
    return this.msg;
  }

  ngOnInit(): void {
  }
}
