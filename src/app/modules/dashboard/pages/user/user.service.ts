import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './store/user';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new Subject<User>();
  userData: Observable<User> = this.userSubject.asObservable();

  constructor(private _httpClient: HttpClient) {}

  createUser(payload: any) {
    return this._httpClient.post<any>(`${environment.apiUrl}user`, payload);
  }

  getAllUser() {
    return this._httpClient.get<User[]>(`${environment.apiUrl}user`);
  }

  getUser() {
    const id = localStorage.getItem('id');
    return this._httpClient
      .get<User>(`${environment.apiUrl}user/${id}`)
      .subscribe((user) => {
        this.userSubject.next(user);
      });
  }

  updateUser(payload: any) {
    return this._httpClient.patch(
      `${environment.apiUrl}user/${payload.id}`,
      payload
    );
  }

  deleteUser(id: string) {
    return this._httpClient.delete(`${environment.apiUrl}user/${id}`);
  }
}
