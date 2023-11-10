import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ProductCategory } from '../../../pages/product-category/store/product-category';
import { invokeDeleteProductCategoryAPI } from '../../../pages/product-category/store/product-category.action';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app-state';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';

@Component({
  selector: 'app-delete-product-category',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './delete-product-category.component.html',
  styleUrls: ['./delete-product-category.component.scss'],
})
export class DeleteProductCategoryComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public productCategory: ProductCategory,
    private _store: Store,
    private _appStore: Store<AppState>,
    private _dialogRef: MatDialogRef<DeleteProductCategoryComponent>
  ) {}

  deleteProductCategory() {
    this._store.dispatch(
      invokeDeleteProductCategoryAPI({ id: this.productCategory.id })
    );
    let apiStatus$ = this._appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this._appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        this.closeDialog();
      }
    });
  }

  closeDialog() {
    this._dialogRef.close();
  }
}
