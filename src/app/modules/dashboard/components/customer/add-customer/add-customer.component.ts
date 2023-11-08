import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app-state';
import { selectProductCategories } from '../../../pages/product-category/store/product-category.selector';
import { invokeProductCategoryAPI } from '../../../pages/product-category/store/product-category.action';
import { invokeSaveNewCustomerAPI } from '../../../pages/customer/store/customer.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
  ],
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
})
export class AddCustomerComponent implements OnInit {
  productCategory$ = this._store.pipe(select(selectProductCategories));
  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store,
    private _appStore: Store<AppState>,
    private _dialogRef: MatDialogRef<AddCustomerComponent>
  ) {}
  ngOnInit(): void {
    this._store.dispatch(invokeProductCategoryAPI());
  }

  customerForm = this._formBuilder.group({
    jina_la_mteja: ['', Validators.required],
    location_ya_mteja: ['', Validators.required],
    namba_ya_simu: ['', Validators.required],
    categoryId: ['', Validators.required],
  });

  saveProduct() {
    if (this.customerForm.invalid) {
      return;
    }
    const customerFormValue = this.customerForm.value;

    this._store.dispatch(
      invokeSaveNewCustomerAPI({
        newCustomer: customerFormValue,
      })
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
