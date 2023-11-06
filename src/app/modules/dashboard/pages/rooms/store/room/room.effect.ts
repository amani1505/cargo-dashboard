import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RoomsService } from '../../rooms.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app-state';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';

import { setAPIStatus } from 'src/app/shared/store/app.action';
import {
  invokeRoomAPI,
  invokeSaveRoomAPI,
  roomFetchAPISuccess,
  saveRoomAPISuccess,
} from './room.action';
import { selectRooms } from './room.selector';

@Injectable()
export class RoomEffect {
  constructor(
    private _actions$: Actions,
    private _roomService: RoomsService,
    private _store: Store,
    private _appStore: Store<AppState>
  ) {}

  // CREATE
  saveNewRoom$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(invokeSaveRoomAPI),
      switchMap((action) => {
        this._appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this._roomService.createRoom(action.newRoom).pipe(
          map((data) => {
            this._appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveRoomAPISuccess({ newRoom: data });
          })
        );
      })
    );
  });

  // READ
  loadAllRooms$ = createEffect(() =>
    this._actions$.pipe(
      ofType(invokeRoomAPI),
      withLatestFrom(this._store.pipe(select(selectRooms))),
      mergeMap(([, roomTypeFromStore]) => {
        if (roomTypeFromStore.length > 0) {
          return EMPTY;
        }
        return this._roomService
          .getRooms()
          .pipe(map((data) => roomFetchAPISuccess({ allRooms: data })));
      })
    )
  );

  //
}
