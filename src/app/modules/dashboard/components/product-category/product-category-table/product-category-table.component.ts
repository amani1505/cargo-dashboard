import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryTableItemComponent } from '../product-category-table-item/product-category-table-item.component';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { AddProductCategoryComponent } from '../add-product-category/add-product-category.component';
import { Store, select } from '@ngrx/store';
import {
  selectProductCategories,
  selectProductCategoryById,
} from '../../../pages/product-category/store/product-category.selector';
import { ProductCategory } from '../../../pages/product-category/store/product-category';
import { invokeProductCategoryAPI } from '../../../pages/product-category/store/product-category.action';
import { compare } from 'src/app/shared/functions/compare.function';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable, take } from 'rxjs';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { UpdateProductCategoryComponent } from '../update-product-category/update-product-category.component';
import { DeleteProductCategoryComponent } from '../delete-product-category/delete-product-category.component';

@Component({
  selector: 'app-product-category-table',
  standalone: true,
  imports: [
    CommonModule,
    ProductCategoryTableItemComponent,
    MatSortModule,
    AddProductCategoryComponent,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    AngularSvgIconModule,
  ],
  templateUrl: './product-category-table.component.html',
  styleUrls: ['./product-category-table.component.scss'],
})
export class ProductCategoryTableComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<ProductCategory>;
  pageSize = 5;

  totalItems = 0;
  showFirstLastButtons = true;
  pageSizeOptions: number[] = [5, 10, 50, 100];
  columns: string[] = ['S/N', 'name', 'action'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  productCategory$: Observable<ProductCategory[]>;

  constructor(private _store: Store, private _dialog: MatDialog) {
    this.productCategory$ = this._store.pipe(select(selectProductCategories));
  }
  ngOnInit(): void {
    this._store.dispatch(invokeProductCategoryAPI());
    this.productCategory$.subscribe((data: ProductCategory[]) => {
      this.totalItems = data.length;
      this.dataSource = new MatTableDataSource<ProductCategory>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addProductCategory() {
    const dialogRef = this._dialog.open(AddProductCategoryComponent, {
      width: '60%',
      disableClose: true,
    });
  }

  updateProductCategory(id: string) {
    let fetchCargo$ = this._store.pipe(select(selectProductCategoryById(id)));
    fetchCargo$.pipe(take(1)).subscribe((data) => {
      this._dialog.open(UpdateProductCategoryComponent, {
        data: data,
        width: '60%',
      });
    });
  }
  deleteProductCategory(id: string) {
    let fetchCargo$ = this._store.pipe(select(selectProductCategoryById(id)));
    fetchCargo$.pipe(take(1)).subscribe((data) => {
      this._dialog.open(DeleteProductCategoryComponent, {
        data: data,
        width: '40%',
      });
    });
  }
}
