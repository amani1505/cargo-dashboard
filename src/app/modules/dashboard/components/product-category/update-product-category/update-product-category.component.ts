import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ProductCategory } from '../../../pages/product-category/store/product-category';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app-state';
import { invokeUpdateProductCategoryAPI } from '../../../pages/product-category/store/product-category.action';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';

@Component({
  selector: 'app-update-product-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatDialogModule],
  templateUrl: './update-product-category.component.html',
  styleUrls: ['./update-product-category.component.scss'],
})
export class UpdateProductCategoryComponent {
  loading: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public productCategory: ProductCategory,
    private _formBuilder: FormBuilder,
    private _store: Store,
    private _appStore: Store<AppState>,
    private _dialogRef: MatDialogRef<UpdateProductCategoryComponent>
  ) {}
  productCategoryForm = this._formBuilder.group({
    name: [this.productCategory.name, Validators.required],
  });

  updateProductCategory() {
    if (this.productCategoryForm.invalid) {
      return;
    }
    this.loading = true;
    const productCategoryFormValue = {
      ...this.productCategoryForm.value,
      id: this.productCategory.id,
    };

    this._store.dispatch(
      invokeUpdateProductCategoryAPI({
        updateProductCategory: productCategoryFormValue,
      })
    );
    let apiStatus$ = this._appStore.pipe(select(selectAppState));

    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this._appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        this.loading = false;
        this.closeDialog();
      }
    });
  }

  closeDialog() {
    this._dialogRef.close();
  }
}
