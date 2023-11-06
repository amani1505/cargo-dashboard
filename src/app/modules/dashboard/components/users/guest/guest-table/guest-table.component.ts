import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSortModule, Sort } from '@angular/material/sort';
import { Nft } from 'src/app/modules/dashboard/models/nft';
import { compare } from 'src/app/shared/functions/compare.function';
import { GuestTableItemComponent } from '../guest-table-item/guest-table-item.component';
import { Store, select } from '@ngrx/store';
import { selectGuests } from 'src/app/modules/dashboard/pages/users/store/guest/guest.selector';
import { invokeGuestsAPI } from 'src/app/modules/dashboard/pages/users/store/guest/guest.action';

@Component({
  selector: 'app-guest-table',
  standalone: true,
  imports: [CommonModule, GuestTableItemComponent, MatSortModule],
  templateUrl: './guest-table.component.html',
  styleUrls: ['./guest-table.component.scss'],
})
export class GuestTableComponent {
  public activeAuction: Nft[] = [];
  addGuest: boolean = false;
  sortedData: Nft[];
  guests$ = this._store.pipe(select(selectGuests));

  constructor(private _store: Store) {
    this.sortedData = this.activeAuction.slice();
  }
  ngOnInit(): void {
    this._store.dispatch(invokeGuestsAPI())
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

  toogleAddGuest() {
    this.addGuest = !this.addGuest;
  }
}
