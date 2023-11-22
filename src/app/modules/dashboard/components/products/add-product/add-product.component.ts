import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app-state';
import { selectProductCategories } from '../../../pages/product-category/store/product-category.selector';
import { invokeProductCategoryAPI } from '../../../pages/product-category/store/product-category.action';
import { invokeSaveNewProductsAPI } from '../../../pages/products/store/products.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatDialogModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  productCategory$ = this._store.pipe(select(selectProductCategories));
  loading:boolean = false
  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store,
    private _appStore: Store<AppState>,
    private _authservice: AuthService,
    private _dialogRef: MatDialogRef<AddProductComponent>
  ) {}

  ngOnInit(): void {
    this._store.dispatch(invokeProductCategoryAPI());
  }

  productForm = this._formBuilder.group({
    name: ['', Validators.required],
    categoryId: ['', Validators.required],
  });

  saveProduct() {
    if (this.productForm.invalid) {
      return;
    }
    this.loading = true
    const productFormValue = {
      ...this.productForm.value,
      instituteId: this._authservice.instituteId,
    };

    this._store.dispatch(
      invokeSaveNewProductsAPI({
        newProduct: productFormValue,
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
