import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AddInstituteComponent } from '../add-institute/add-institute.component';
import { Institute } from '../../../pages/institute/store/institute';
import { environment } from 'src/environments/environment';
import { Observable, take } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  selectInstituteById,
  selectInstitutes,
} from '../../../pages/institute/store/institute.selector';
import { invokeInstituteAPI } from '../../../pages/institute/store/institute.action';
import { UpdateInstituteComponent } from '../update-institute/update-institute.component';
import { DeleteInstituteComponent } from '../delete-institute/delete-institute.component';

@Component({
  selector: 'app-institute-table',
  standalone: true,
  imports: [
    CommonModule,
    MatSortModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    AngularSvgIconModule,
    AddInstituteComponent,
  ],
  templateUrl: './institute-table.component.html',
  styleUrls: ['./institute-table.component.scss'],
})
export class InstituteTableComponent implements OnInit, AfterViewInit {
  apiUrl = environment.apiUrl;
  dataSource: MatTableDataSource<Institute>;
  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;
  showFirstLastButtons = true;
  pageSizeOptions: number[] = [5, 10, 50, 100];
  columns: string[] = [ 'Logo', 'Name', 'Location', 'action'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  institutes$: Observable<Institute[]>;

  constructor(private _store: Store, private _dialog: MatDialog) {
    this.institutes$ = this._store.pipe(select(selectInstitutes));
  }
  ngOnInit(): void {
    this._store.dispatch(invokeInstituteAPI());
    this.institutes$.subscribe((data: Institute[]) => {
      this.totalItems = data.length;
      this.dataSource = new MatTableDataSource<Institute>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  addInstitute() {
    const dialogRef = this._dialog.open(AddInstituteComponent, {
      width: '60%',
      disableClose: true,
    });
  }

  updateInstitute(id: string) {
    let fetchCargo$ = this._store.pipe(select(selectInstituteById(id)));
    fetchCargo$.pipe(take(1)).subscribe((data) => {
      const dialogRef = this._dialog.open(UpdateInstituteComponent, {
        data: data,
        width: '60%',
      });
      dialogRef.afterClosed().subscribe(() => {});
    });
  }
  deleteInstitute(id: string) {
    let fetchCargo$ = this._store.pipe(select(selectInstituteById(id)));
    fetchCargo$.pipe(take(1)).subscribe((data) => {
      this._dialog.open(DeleteInstituteComponent, {
        data: data,
        width: '40%',
      });
    });
  }
}
