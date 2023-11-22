import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Institute } from '../../../pages/institute/store/institute';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app-state';
import { invokeDeleteInstituteAPI } from '../../../pages/institute/store/institute.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-delete-institute',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './delete-institute.component.html',
  styleUrls: ['./delete-institute.component.scss'],
})
export class DeleteInstituteComponent {
  loading: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public institute: Institute,
    private _store: Store,
    private _appStore: Store<AppState>,
    private _dialogRef: MatDialogRef<DeleteInstituteComponent>
  ) {}

  deleteInstitute() {
    this.loading = true;
    this._store.dispatch(invokeDeleteInstituteAPI({ id: this.institute.id }));
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
