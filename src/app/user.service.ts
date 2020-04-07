import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class UserService {

  edit: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient
  ) {}

  get(page?: number, size?: number) {
    let url = `${environment.api}user`;
    
    if(page || page === 0) {
      url = url + '?page=' + page;

      if(size) {
        url = url + '&size=' + size;
      }
    }

    return this.http.get(url);
  }

  post(user) {
    return this.http.post(`${environment.api}user`, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.api}user/${id}`);
  }
}
