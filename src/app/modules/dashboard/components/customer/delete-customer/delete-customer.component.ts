import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Customer } from '../../../pages/customer/store/customer';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app-state';
import { invokeDeleteCustomerAPI } from '../../../pages/customer/store/customer.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-delete-customer',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.scss'],
})
export class DeleteCustomerComponent {
  loading: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public customer: Customer,
    private _store: Store,
    private _appStore: Store<AppState>,
    private _dialogRef: MatDialogRef<DeleteCustomerComponent>
  ) {}

  deleteCustomer() {
    this.loading = true;
    this._store.dispatch(invokeDeleteCustomerAPI({ id: this.customer.id }));
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
