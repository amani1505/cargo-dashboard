import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Products } from '../../../pages/products/store/products';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app-state';
import { selectProductCategories } from '../../../pages/product-category/store/product-category.selector';
import { invokeProductCategoryAPI } from '../../../pages/product-category/store/product-category.action';
import { invokeUpdateProductAPI } from '../../../pages/products/store/products.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatDialogModule],
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
  productCategory$ = this._store.pipe(select(selectProductCategories));
  loading:boolean = false
  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Products,
    private _formBuilder: FormBuilder,
    private _store: Store,
    private _appStore: Store<AppState>,
    private _dialogRef: MatDialogRef<UpdateProductComponent>
  ) {}

  ngOnInit(): void {
    this._store.dispatch(invokeProductCategoryAPI());
  }

  productForm = this._formBuilder.group({
    name: [this.product.name, Validators.required],
    categoryId: [this.product.category?.id, Validators.required],
  });

  updateProduct() {
    if (this.productForm.invalid) {
      return;
    }
    this.loading = true
    const productFormValue = {
      ...this.productForm.value,
      id: this.product.id,
    };

    this._store.dispatch(
      invokeUpdateProductAPI({
        updateProduct: productFormValue,
      })
    );
    let apiStatus$ = this._appStore.pipe(select(selectAppState));

    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this._appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        this.loading = false
        this.closeDialog();
      }
    });
  }

  closeDialog() {
    this._dialogRef.close();
  }
}
