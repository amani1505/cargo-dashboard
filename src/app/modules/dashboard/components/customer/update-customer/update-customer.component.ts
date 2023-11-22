import { Component, Inject, OnInit } from '@angular/core';
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
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app-state';
import { invokeProductCategoryAPI } from '../../../pages/product-category/store/product-category.action';
import { selectProductCategories } from '../../../pages/product-category/store/product-category.selector';
import { invokeUpdateCustomerAPI } from '../../../pages/customer/store/customer.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Customer } from '../../../pages/customer/store/customer';

@Component({
  selector: 'app-update-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatDialogModule],
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss'],
})
export class UpdateCustomerComponent implements OnInit {
  productCategory$ = this._store.pipe(select(selectProductCategories));
  loading: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public customer: Customer,
    private _formBuilder: FormBuilder,
    private _store: Store,
    private _appStore: Store<AppState>,
    private _dialogRef: MatDialogRef<UpdateCustomerComponent>
  ) {}

  ngOnInit(): void {
    this._store.dispatch(invokeProductCategoryAPI());
  }
  customerForm = this._formBuilder.group({
    jina_la_mteja: [this.customer.jina_la_mteja, Validators.required],
    location_ya_mteja: [this.customer.location_ya_mteja, Validators.required],
    namba_ya_simu: [this.customer.namba_ya_simu, Validators.required],
    categoryId: [this.customer.category?.id, Validators.required],
  });

  updateProduct() {
    if (this.customerForm.invalid) {
      return;
    }
    this.loading = true;
    const customerFormValue = {
      ...this.customerForm.value,
      id: this.customer.id,
    };

    this._store.dispatch(
      invokeUpdateCustomerAPI({
        updateCustomer: customerFormValue,
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
