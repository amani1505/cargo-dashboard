import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app-state';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { invokeSaveNewInstituteAPI } from '../../../pages/institute/store/institute.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-add-institute',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatDialogModule],
  templateUrl: './add-institute.component.html',
  styleUrls: ['./add-institute.component.scss'],
})
export class AddInstituteComponent implements OnInit {
  loading: boolean = false;
  logo: File;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store,
    private _appStore: Store<AppState>,
    private _dialogRef: MatDialogRef<AddInstituteComponent>
  ) {}
  ngOnInit(): void {}

  instituteForm = this._formBuilder.group({
    name: ['', Validators.required],
    location: ['', Validators.required],
  });

  onImageFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.logo = fileInput.files[0];
    }
  }

  saveInstitute() {
    if (this.instituteForm.invalid) {
      return;
    }
    this.loading = true;
    const instituteFormValue = {
      ...this.instituteForm.value,
      logo: this.logo,
    };

    const instituteFormData = new FormData();

    for (const key in instituteFormValue) {
      if (instituteFormValue.hasOwnProperty(key)) {
        const value = instituteFormValue[key];
        instituteFormData.append(key, value);
      }
    }

    this._store.dispatch(
      invokeSaveNewInstituteAPI({ newInstitute: instituteFormData })
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
