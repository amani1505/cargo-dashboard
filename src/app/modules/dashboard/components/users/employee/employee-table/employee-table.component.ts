import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeTableItemComponent } from '../employee-table-item/employee-table-item.component';
import { MatSortModule, Sort } from '@angular/material/sort';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Nft } from 'src/app/modules/dashboard/models/nft';
import { compare } from 'src/app/shared/functions/compare.function';
import { Store, select } from '@ngrx/store';
import { selectEmployees } from 'src/app/modules/dashboard/pages/users/store/employee/employee.selector';
import { invokeEmployeesAPI } from 'src/app/modules/dashboard/pages/users/store/employee/employee.action';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [
    CommonModule,
    EmployeeTableItemComponent,
    MatSortModule,
    AddEmployeeComponent,
  ],
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss'],
})
export class EmployeeTableComponent {
  public activeAuction: Nft[] = [];
  addEmployee: boolean = false;
  sortedData: Nft[];
  employees$ = this._store.pipe(select(selectEmployees));
  constructor(private _store: Store) {
    this.sortedData = this.activeAuction.slice();
  }
  ngOnInit(): void {
    this._store.dispatch(invokeEmployeesAPI());
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

  toogleAddEmployee() {
    this.addEmployee = !this.addEmployee;
  }
}
