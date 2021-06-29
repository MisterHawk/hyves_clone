import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from './profile';
import { Observable } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER = "http://127.0.0.1:8080";

  constructor(private httpClient: HttpClient) { }

  readUser(id: string): Observable<Profile>{
    return this.httpClient.get<Profile>(`${this.PHP_API_SERVER}/backend/php/API/profile/read_profile.php/?id=${id}`);
  }

  readFriends(id: string): Observable<Profile[]>{
    return this.httpClient.get<Profile[]>(`${this.PHP_API_SERVER}/backend/php/API/friends/read_friends.php/?id=${id}`);
  }

  readRequests(id: string): Observable<Profile[]>{
    return this.httpClient.get<Profile[]>(`${this.PHP_API_SERVER}/backend/php/API/friends/check_requests.php/?id=${id}`);
  }

  requestReply(data: FormData): Observable<string>{
    return this.httpClient.post<string>(`${this.PHP_API_SERVER}/backend/php/API/friends/request_reply.php`, data);
  }

  addFriend(data: FormData): Observable<string>{
    return this.httpClient.post<string>(`${this.PHP_API_SERVER}/backend/php/API/friends/add_friend.php`, data);
  }

  deleteFriend(data: FormData): Observable<string>{
    return this.httpClient.post<string>(`${this.PHP_API_SERVER}/backend/php/API/friends/remove_friend.php`, data);
  }

  getPostUser(id: string): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.PHP_API_SERVER}/backend/php/API/posts/get_user_posts.php/?id=${id}`);
  }

  getPostsTimeline(id: string): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.PHP_API_SERVER}/backend/php/API/posts/get_timeline_posts.php/?id=${id}`);
  }

  makePost(data: FormData): Observable<Post> {
    return this.httpClient.post<Post>(`${this.PHP_API_SERVER}/backend/php/API/posts/make_post.php`, data);
  }

}
