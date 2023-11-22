import { Component, Inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app-state';
import { Cargo } from '../../../pages/cargo/store/cargo';
import { invokeDeleteCargoAPI } from '../../../pages/cargo/store/cargo.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-delete-cargo',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './delete-cargo.component.html',
  styleUrls: ['./delete-cargo.component.scss'],
})
export class DeleteCargoComponent {
  loading:boolean = false
  constructor(
    @Inject(MAT_DIALOG_DATA) public cargo: Cargo,
    private _store: Store,
    private _appStore: Store<AppState>,
    private _dialogRef: MatDialogRef<DeleteCargoComponent>
  ) {}

  deleteCargo() {
    this.loading = true
    this._store.dispatch(invokeDeleteCargoAPI({ id: this.cargo.id }));
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
