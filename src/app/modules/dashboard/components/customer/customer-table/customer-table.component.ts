import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { Customer } from '../../../pages/customer/store/customer';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectCustomers } from '../../../pages/customer/store/customer.selector';
import { invokeCustomerAPI } from '../../../pages/customer/store/customer.action';

@Component({
  selector: 'app-customer-table',
  standalone: true,
  imports: [
    CommonModule,
    MatSortModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    AngularSvgIconModule,
    AddCustomerComponent,
  ],
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss'],
})
export class CustomerTableComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Customer>;
  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;
  showFirstLastButtons = true;
  pageSizeOptions: number[] = [5, 10, 50, 100];
  columns: string[] = [
    'S/N',
    'fullname',
    'location',
    'mobile number',
    'category',
    'action',
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  customer$: Observable<Customer[]>;

  constructor(private _store: Store, private _dialog: MatDialog) {
    this.customer$ = this._store.pipe(select(selectCustomers));
  }

  ngOnInit(): void {
    this._store.dispatch(invokeCustomerAPI());
    this.customer$.subscribe((data: Customer[]) => {
      this.totalItems = data.length;
      this.dataSource = new MatTableDataSource<Customer>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

    ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  addCustomer() {
    const dialogRef = this._dialog.open(AddCustomerComponent, {
      width: '60%',
      disableClose: true,
    });
  }




}
