import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { User } from '../../../pages/user/store/user';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app-state';
import { invokeDeleteUserAPI } from '../../../pages/user/store/user.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent {
  loading: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User,
    private _store: Store,
    private _appStore: Store<AppState>,
    private _dialogRef: MatDialogRef<DeleteUserComponent>
  ) {}

  deleteUser() {
    this.loading = true;
    this._store.dispatch(invokeDeleteUserAPI({ id: this.user.id }));
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
