import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomType } from './store/room-type/room-type';
import { environment } from 'src/environments/environment';
import { Room } from './store/room/room';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  constructor(private _httpClient: HttpClient) {}

  /**===================== ROOM TYPES ======================= */

  // CREATE
  createRoomType(payload: any) {
    return this._httpClient.post<any>(
      `${environment.apiUrl}room-type`,
      payload
    );
  }
  //  READ
  getRoomTypes() {
    return this._httpClient.get<RoomType[]>(`${environment.apiUrl}room-type`);
  }

  /**===================== ROOM  ======================= */

  // CREATE
  createRoom(payload: any) {
    return this._httpClient.post<any>(`${environment.apiUrl}room`, payload);
  }
  //  READ
  getRooms() {
    return this._httpClient.get<Room[]>(`${environment.apiUrl}room`);
  }
}
