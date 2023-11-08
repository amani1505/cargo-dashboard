import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { selectProductCategories } from '../../../pages/product-category/store/product-category.selector';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app-state';
import { invokeProductCategoryAPI } from '../../../pages/product-category/store/product-category.action';
import { selectCustomers } from '../../../pages/customer/store/customer.selector';
import { invokeCustomerAPI } from '../../../pages/customer/store/customer.action';
import { invokeSaveNewCargoAPI } from '../../../pages/cargo/store/cargo.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-add-cargo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatDialogModule],
  templateUrl: './add-cargo.component.html',
  styleUrls: ['./add-cargo.component.scss'],
})
export class AddCargoComponent implements OnInit {
  image: File;
  productCategory$ = this._store.pipe(select(selectProductCategories));
  customer$ = this._store.pipe(select(selectCustomers));

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store,
    private _appStore: Store<AppState>,
    private _dialogRef: MatDialogRef<AddCargoComponent>
  ) {}
  ngOnInit(): void {
    this._store.dispatch(invokeProductCategoryAPI());
    this._store.dispatch(invokeCustomerAPI());
  }

  cargoForm = this._formBuilder.group({
    uzito: ['', Validators.required],
    tarehe_kuingia: ['', Validators.required],
    status: ['remain', Validators.required],
    mtejaId: ['', Validators.required],
    categoryId: ['', Validators.required],
    cargo_no: ['', Validators.required],
  });

  onImageFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.image = fileInput.files[0];
    }
  }

  saveCargo() {
    if (this.cargoForm.invalid) {
      return;
    }
    const cargoFormValue = { ...this.cargoForm.value, image: this.image };

    const cargoFormData = new FormData();

    for (const key in cargoFormValue) {
      if (cargoFormValue.hasOwnProperty(key)) {
        const value = cargoFormValue[key];
        cargoFormData.append(key, value);
      }
    }

    this._store.dispatch(invokeSaveNewCargoAPI({ newCargo: cargoFormData }));
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
