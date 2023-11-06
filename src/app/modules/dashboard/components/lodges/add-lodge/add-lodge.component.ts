import { Component, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app-state';
import { Router, RouterModule } from '@angular/router';
import { invokeSaveNewLodgeAPI } from '../../../pages/lodges/store/lodge/lodge.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-add-lodge',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './add-lodge.component.html',
  styleUrls: ['./add-lodge.component.scss'],
})
export class AddLodgeComponent {
  image: File;
  @Output() closeLodge: boolean = true;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store,
    private _appStore: Store<AppState>,
  
  ) {}

  lodgeForm = this._formBuilder.group({
 
    city: ['', Validators.required],
    address: ['', Validators.required],
    description: ['', Validators.required],
  });

  onImageFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.image = fileInput.files[0];
     
    }
  }

  saveLodge() {
    if (this.lodgeForm.invalid) {
      return;
    }
    const lodgeFormValue = { ...this.lodgeForm.value, images: this.image };
   
    const lodgeFormData = new FormData();

    for (const key in lodgeFormValue) {
      if (lodgeFormValue.hasOwnProperty(key)) {
        const value = lodgeFormValue[key];
        lodgeFormData.append(key, value);
      }
    }

    this._store.dispatch(invokeSaveNewLodgeAPI({ newLodge: lodgeFormData }));
    let apiStatus$ = this._appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState)=>{
      if (apState.apiStatus == 'success') {
        this._appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
         this.closeLodge = false
      }
    })
 
  }
}
