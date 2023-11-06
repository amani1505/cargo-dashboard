import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSortModule, Sort } from '@angular/material/sort';
import { Nft } from 'src/app/modules/dashboard/models/nft';
import { compare } from 'src/app/shared/functions/compare.function';

import { RoomTypeTableItemComponent } from '../room-type-table-item/room-type-table-item.component';
import { AddRoomTypeComponent } from '../add-room-type/add-room-type.component';
import { Store, select } from '@ngrx/store';
import { selectRoomTypes } from 'src/app/modules/dashboard/pages/rooms/store/room-type/room-type.selector';
import { invokeRoomTypeAPI } from 'src/app/modules/dashboard/pages/rooms/store/room-type/room-type.action';

@Component({
  selector: 'app-room-type-table',
  standalone: true,
  imports: [
    CommonModule,
    RoomTypeTableItemComponent,
    MatSortModule,
    AddRoomTypeComponent,
  ],
  templateUrl: './room-type-table.component.html',
  styleUrls: ['./room-type-table.component.scss'],
})
export class RoomTypeTableComponent {
  public activeAuction: Nft[] = [];
  addRoomType: boolean = false;
  sortedData: Nft[];
  roomTypes$ = this._store.pipe(select(selectRoomTypes));

  constructor(private _store: Store) {
    this.sortedData = this.activeAuction.slice();
  }
  ngOnInit(): void {
    this._store.dispatch(invokeRoomTypeAPI());
  }

  sortData(sort: Sort) {
    const data = this.activeAuction.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'instant_price':
          return compare(a.instant_price, b.instant_price, isAsc);
        case 'price':
          return compare(a.price, b.price, isAsc);
        case 'last_bid':
          return compare(a.last_bid, b.last_bid, isAsc);
        default:
          return 0;
      }
    });
    this.activeAuction = this.sortedData;
  }

  toogleAddRoomType() {
    this.addRoomType = !this.addRoomType;
  }
}
