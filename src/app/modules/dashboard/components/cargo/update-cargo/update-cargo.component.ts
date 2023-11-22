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
import { Store, select } from '@ngrx/store';
import { selectCustomers } from '../../../pages/customer/store/customer.selector';
import { selectProductCategories } from '../../../pages/product-category/store/product-category.selector';
import { AppState } from 'src/app/shared/store/app-state';
import { invokeCustomerAPI } from '../../../pages/customer/store/customer.action';
import { invokeProductCategoryAPI } from '../../../pages/product-category/store/product-category.action';
import { AddCargoComponent } from '../add-cargo/add-cargo.component';
import { invokeUpdateCargoAPI } from '../../../pages/cargo/store/cargo.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Cargo } from '../../../pages/cargo/store/cargo';
import { _fixedSizeVirtualScrollStrategyFactory } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-update-cargo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatDialogModule],
  templateUrl: './update-cargo.component.html',
  styleUrls: ['./update-cargo.component.scss'],
})
export class UpdateCargoComponent {
  image: File;
  imageData: File;
  editImage: boolean = false;
  loading: boolean = false;
  productCategory$ = this._store.pipe(select(selectProductCategories));
  customer$ = this._store.pipe(select(selectCustomers));

  constructor(
    @Inject(MAT_DIALOG_DATA) public cargo: Cargo,
    private _formBuilder: FormBuilder,
    private _store: Store,
    private _appStore: Store<AppState>,
    private _dialogRef: MatDialogRef<AddCargoComponent>
  ) {
    const imageFileBlob = new Blob([this.cargo.image], {
      type: 'image/*',
    });

    this.imageData = new File([imageFileBlob], this.cargo.image, {
      type: imageFileBlob.type,
    });
  }
  ngOnInit(): void {
    this._store.dispatch(invokeProductCategoryAPI());
    this._store.dispatch(invokeCustomerAPI());
  }

  cargoForm = this._formBuilder.group({
    uzito: [this.cargo?.uzito, Validators.required],
    tarehe_kuingia: [this.cargo?.tarehe_kuingia, Validators.required],
    tarehe_ya_kutoka: [this.cargo?.tarehe_ya_kutoka, Validators.required],
    status: ['taken', Validators.required],
    mtejaId: [this.cargo.mteja?.id, Validators.required],
    categoryId: [this.cargo.category?.id, Validators.required],
    cargo_no: [this.cargo?.cargo_no, Validators.required],
  });

  addImage() {
    this.editImage = true;
  }
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
    this.loading = true;
    const cargoFormValue = {
      ...this.cargoForm.value,
    };
    // console.log('FORM DATA', this.imageData);
    // const cargoFormData = new FormData();

    // for (const key in cargoFormValue) {
    //   if (cargoFormValue.hasOwnProperty(key)) {
    //     const value = cargoFormValue[key];
    //     cargoFormData.append(key, value);
    //   }
    // }

    this._store.dispatch(
      invokeUpdateCargoAPI({ id: this.cargo.id, updateCargo: cargoFormValue })
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
