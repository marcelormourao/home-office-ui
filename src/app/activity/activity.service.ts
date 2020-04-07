import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
// import { DateUtil } from '../util/date-util';
import * as dayjs from 'dayjs';

@Injectable()
export class ActivityService {

  edit: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient
  ) {}

  get(page: number = 0 , size: number = 5, date: Date = new Date(), user?: number) {
    let dateString = dayjs(date).format('YYYY-MM-DD');

    let url = `${environment.api}activity?page=${page}&size=${size}&date=${dateString}`;

    if(user) {
      url = url + `&user=${user}`;
    }

    return this.http.get(url);
  }

  post(task) {
    return this.http.post(`${environment.api}activity`, task);
  }

  delete(id: number) {
    return this.http.delete(`${environment.api}activity/${id}`);
  }
}
