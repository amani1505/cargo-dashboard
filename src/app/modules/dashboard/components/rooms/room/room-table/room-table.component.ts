import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { compare } from 'src/app/shared/functions/compare.function';
import { MatSortModule, Sort } from '@angular/material/sort';
import { Nft } from 'src/app/modules/dashboard/models/nft';
import { RoomTableItemComponent } from '../room-table-item/room-table-item.component';
import { AddRoomComponent } from '../add-room/add-room.component';
import { Store, select } from '@ngrx/store';
import { selectRooms } from 'src/app/modules/dashboard/pages/rooms/store/room/room.selector';
import { invokeRoomAPI } from 'src/app/modules/dashboard/pages/rooms/store/room/room.action';
import { Room } from 'src/app/modules/dashboard/pages/rooms/store/room/room';

@Component({
  selector: 'app-room-table',
  standalone: true,
  imports: [
    CommonModule,
    RoomTableItemComponent,
    MatSortModule,
    AddRoomComponent,
  ],
  templateUrl: './room-table.component.html',
  styleUrls: ['./room-table.component.scss'],
})
export class RoomTableComponent {
  public activeAuction: Nft[] = [];
  addRoom: boolean = false;
  sortedData: Room[];
  rooms$ = this._store.pipe(select(selectRooms));

  constructor(private _store: Store) {
    // this.sortedData = this.rooms$.slice();
  }
  ngOnInit(): void {
    this._store.dispatch(invokeRoomAPI());
    // this.activeAuction = this.sortedData;
  }

  toogleAddRoom() {
    this.addRoom = !this.addRoom;
  }
}
