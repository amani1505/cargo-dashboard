import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { Store, select } from '@ngrx/store';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AppState } from 'src/app/shared/store/app-state';
import { invokeSaveNewUserAPI } from '../../../pages/user/store/user.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectInstitutes } from '../../../pages/institute/store/institute.selector';
import { invokeInstituteAPI } from '../../../pages/institute/store/institute.action';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    AngularSvgIconModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  loading: boolean = false;
  institutes$ = this._store.pipe(select(selectInstitutes));
  constructor(
    private readonly _formBuilder: FormBuilder,
    private _store: Store,
    private _appStore: Store<AppState>,
    private _dialogRef: MatDialogRef<AddUserComponent>
  ) {}
  ngOnInit(): void {
    this._store.dispatch(invokeInstituteAPI());
  }

  userForm = this._formBuilder.group({
    full_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    instituteId: ['', Validators.required],
    mobile_number: ['', Validators.required],
    password: ['', Validators.required],
    role: ['admin'],
  });

  saveUser() {
    if (this.userForm.invalid) {
      return;
    }
    this.loading = true;
    const userFormValue = this.userForm.value;

    this._store.dispatch(invokeSaveNewUserAPI({ newUser: userFormValue }));
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
