import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app-state';
import { invokeSaveRoomTypeAPI } from 'src/app/modules/dashboard/pages/rooms/store/room-type/room-type.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-add-room-type',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-room-type.component.html',
  styleUrls: ['./add-room-type.component.scss'],
})
export class AddRoomTypeComponent {
  image: File;
  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store,
    private _appStore: Store<AppState>
  ) {}

  roomTypeForm = this._formBuilder.group({
    type: ['', Validators.required],
    capacity: ['', Validators.required],
    room_price: ['', Validators.required],
    description: ['', Validators.required],
  });

  onImageFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.image = fileInput.files[0];
    }
  }

  saveRoomType() {
    if (this.roomTypeForm.invalid) {
      return;
    }
    const roomTypeFormValue = {
      ...this.roomTypeForm.value,
      images: this.image,
    };
  

    const roomTypeFormData = new FormData();

    for (const key in roomTypeFormValue) {
      if (roomTypeFormValue.hasOwnProperty(key)) {
        const value = roomTypeFormValue[key];
        roomTypeFormData.append(key, value);
      }
    }

    this._store.dispatch(
      invokeSaveRoomTypeAPI({ newRoomType: roomTypeFormData })
    );
    let apiStatus$ = this._appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this._appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
      }
    });
  }
}
