import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AddCargoComponent } from '../add-cargo/add-cargo.component';
import { Cargo } from '../../../pages/cargo/store/cargo';
import { Observable, take } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  selectCargoById,
  selectCargos,
} from '../../../pages/cargo/store/cargo.selector';
import { invokeCargoAPI } from '../../../pages/cargo/store/cargo.action';
import { UpdateCargoComponent } from '../update-cargo/update-cargo.component';
import { DeleteCargoComponent } from '../delete-cargo/delete-cargo.component';

@Component({
  selector: 'app-cargo-table',
  standalone: true,
  imports: [
    CommonModule,
    MatSortModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    AngularSvgIconModule,
    AddCargoComponent,
    UpdateCargoComponent,
    DeleteCargoComponent,
  ],
  templateUrl: './cargo-table.component.html',
  styleUrls: ['./cargo-table.component.scss'],
})
export class CargoTableComponent implements OnInit, AfterViewInit {
  apiUrl = environment.apiUrl;
  dataSource: MatTableDataSource<Cargo>;
  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;
  showFirstLastButtons = true;
  pageSizeOptions: number[] = [5, 10, 50, 100];
  columns: string[] = [
    'cargo',
    'customer',
    'weight',
    'time in',
    'time out',
    'category',
    'action',
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  cargo$: Observable<Cargo[]>;

  constructor(private _store: Store, private _dialog: MatDialog) {
    this.cargo$ = this._store.pipe(select(selectCargos));
  }

  ngOnInit(): void {
    this._store.dispatch(invokeCargoAPI());
    this.cargo$.subscribe((data: Cargo[]) => {
      this.totalItems = data.length;
      this.dataSource = new MatTableDataSource<Cargo>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  addCargo() {
    const dialogRef = this._dialog.open(AddCargoComponent, {
      width: '60%',
      disableClose: true,
    });
  }
  updateCargo(id: string) {
    let fetchCargo$ = this._store.pipe(select(selectCargoById(id)));
    fetchCargo$.subscribe((data) => {
      this._dialog.open(UpdateCargoComponent, {
        data: data,
        width: '60%',
      });
    });
  }
  deleteCargo(id: string) {
    let fetchCargo$ = this._store.pipe(select(selectCargoById(id)));
    fetchCargo$.pipe(take(1)).subscribe((data) => {
      this._dialog.open(DeleteCargoComponent, {
        data: data,
        width: '40%',
      });
    });
  }
}
