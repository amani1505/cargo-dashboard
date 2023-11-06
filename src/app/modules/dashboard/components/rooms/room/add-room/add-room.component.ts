import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app-state';
import {
  invokeRoomAPI,
  invokeSaveRoomAPI,
} from 'src/app/modules/dashboard/pages/rooms/store/room/room.action';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { selectLodges } from 'src/app/modules/dashboard/pages/lodges/store/lodge/lodge.selectror';
import { selectRoomTypes } from 'src/app/modules/dashboard/pages/rooms/store/room-type/room-type.selector';
import { invokeRoomTypeAPI } from 'src/app/modules/dashboard/pages/rooms/store/room-type/room-type.action';
import { invokeLodgesAPI } from 'src/app/modules/dashboard/pages/lodges/store/lodge/lodge.action';

@Component({
  selector: 'app-add-room',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss'],
})
export class AddRoomComponent implements OnInit {
  roomsTypes$ = this._store.pipe(select(selectRoomTypes));
  lodges$ = this._store.pipe(select(selectLodges));
  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store,
    private _appStore: Store<AppState>
  ) {}

  ngOnInit(): void {
    this._store.dispatch(invokeRoomTypeAPI());
    this._store.dispatch(invokeLodgesAPI());
  }

  roomForm = this._formBuilder.group({
    room_number: ['', Validators.required],
    lodgeId: ['', Validators.required],
    roomTypeId: ['', Validators.required],
  });

  saveRoom() {
    if (this.roomForm.invalid) {
      return;
    }
    const roomFormValue = this.roomForm.value;
    console.log("room Forms", roomFormValue)

    this._store.dispatch(invokeSaveRoomAPI({ newRoom: roomFormValue }));
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
