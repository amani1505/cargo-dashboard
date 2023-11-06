import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Nft } from '../../../models/nft';
import { TableItemComponent } from '../table-item/table-item.component';
import { Sort, MatSortModule } from '@angular/material/sort';
import { OnInit } from '@angular/core';
import { AddLodgeComponent } from '../add-lodge/add-lodge.component';
import { compare } from 'src/app/shared/functions/compare.function';
import { Store, select } from '@ngrx/store';
import { selectLodges } from '../../../pages/lodges/store/lodge/lodge.selectror';
import { invokeLodgesAPI } from '../../../pages/lodges/store/lodge/lodge.action';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, TableItemComponent, MatSortModule, AddLodgeComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  public activeAuction: Nft[] = [];
  @Input() closeLodge: boolean;
  addLodge: boolean = false;
  sortedData: Nft[];
  lodges$ = this._store.pipe(select(selectLodges));

  constructor(private _store: Store) {
    this.sortedData = this.activeAuction.slice();
  }

  ngOnInit(): void {
    this._store.dispatch(invokeLodgesAPI());
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

  toogleAddLodge() {
    this.closeLodge = !this.closeLodge;
  }
}
