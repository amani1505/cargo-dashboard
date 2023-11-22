import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products } from '../../../pages/products/store/products';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { invokeDeleteProductAPI } from '../../../pages/products/store/products.action';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app-state';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';

@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss'],
})
export class DeleteProductComponent {
  loading:boolean = false
  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Products,
    private _store: Store,
    private _appStore: Store<AppState>,
    private _dialogRef: MatDialogRef<DeleteProductComponent>
  ) {}

  deleteProduct() {
    this.loading = true
    this._store.dispatch(invokeDeleteProductAPI({ id: this.product.id }));
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
