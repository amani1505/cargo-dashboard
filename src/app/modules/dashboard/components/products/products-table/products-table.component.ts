import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AddProductComponent } from '../add-product/add-product.component';
import { Products } from '../../../pages/products/store/products';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectProducts } from '../../../pages/products/store/products.selector';
import { invokeProductsAPI } from '../../../pages/products/store/products.action';

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [
    CommonModule,
    MatSortModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    AngularSvgIconModule,
    AddProductComponent,
  ],
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Products>;
  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;
  showFirstLastButtons = true;
  pageSizeOptions: number[] = [5, 10, 50, 100];
  columns: string[] = ["S/N",'name','category','action'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  product$: Observable<Products[]>;

  constructor(private _store: Store, private _dialog: MatDialog) {
    this.product$ = this._store.pipe(select(selectProducts));
  }
  ngOnInit(): void {
    this._store.dispatch(invokeProductsAPI());
    this.product$.subscribe((data: Products[]) => {
      this.totalItems = data.length;
      this.dataSource = new MatTableDataSource<Products>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

    ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  addProduct() {
    const dialogRef = this._dialog.open(AddProductComponent, {
      width: '60%',
      disableClose: true,
    });
  }
}
