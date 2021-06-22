import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from './profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER = "http://127.0.0.1:8080";

  constructor(private httpClient: HttpClient) { }

  readUser(id: string): Observable<Profile>{
    return this.httpClient.get<Profile>(`${this.PHP_API_SERVER}/backend/php/API/read_profile.php/?id=${id}`);
  }

  readFriends(id: string): Observable<Profile[]>{
    return this.httpClient.get<Profile[]>(`${this.PHP_API_SERVER}/backend/php/API/read_friends.php/?id=${id}`);
  }

}
