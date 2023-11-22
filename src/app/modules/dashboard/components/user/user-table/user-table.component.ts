import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { User } from '../../../pages/user/store/user';
import { Store, select } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import {
  selectUserById,
  selectUsers,
} from '../../../pages/user/store/user.selector';
import { invokeUserAPI } from '../../../pages/user/store/user.action';
import { AddUserComponent } from '../add-user/add-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    CommonModule,
    MatSortModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    AngularSvgIconModule,
  ],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<User>;
  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;
  showFirstLastButtons = true;
  pageSizeOptions: number[] = [5, 10, 50, 100];
  columns: string[] = [
    'Fullname',
    'Email',
    'Phone Number',
    'Role',
    'Institute',
    'Action',
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  users$: Observable<User[]>;

  constructor(private _store: Store, private _dialog: MatDialog) {
    this.users$ = this._store.pipe(select(selectUsers));
  }
  ngOnInit(): void {
    this._store.dispatch(invokeUserAPI());
    this.users$.subscribe((data: User[]) => {
      this.totalItems = data.length;
      this.dataSource = new MatTableDataSource<User>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  addUser() {
    const dialogRef = this._dialog.open(AddUserComponent, {
      width: '60%',
      disableClose: true,
    });
  }
  deleteUser(id: string) {
    let fetchCargo$ = this._store.pipe(select(selectUserById(id)));
    fetchCargo$.pipe(take(1)).subscribe((data) => {
      this._dialog.open(DeleteUserComponent, {
        data: data,
        width: '40%',
      });
    });
  }
}
