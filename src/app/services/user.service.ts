import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponseList, ApiResponseSingle } from '../interfaces/api-response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'https://reqres.in/api';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<ApiResponseList>{
   return this.http.get<ApiResponseList>(`${this.url}/users?per_page=10`);
  }

  getUserById(id: string):Observable<ApiResponseSingle>{
    return this.http.get<ApiResponseSingle>(`${this.url}/users/${id}`);
  }
}
