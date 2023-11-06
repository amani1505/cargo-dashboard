import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RoomsService } from '../../rooms.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app-state';
import {
  invokeRoomTypeAPI,
  invokeSaveRoomTypeAPI,
  roomTypeFetchAPISuccess,
  saveRoomTypeAPISuccess,
} from './room-type.action';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { selectRoomTypes } from './room-type.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';

@Injectable()
export class RoomTypeEffect {
  constructor(
    private _actions$: Actions,
    private _roomService: RoomsService,
    private _store: Store,
    private _appStore: Store<AppState>
  ) {}

  // CREATE ROOM TYPE
  saveNewRoomType$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(invokeSaveRoomTypeAPI),
      switchMap((action) => {
        this._appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this._roomService.createRoomType(action.newRoomType).pipe(
          map((data) => {
            this._appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveRoomTypeAPISuccess({ newRoomType: data });
          })
        );
      })
    );
  });

  // READ ALL ROOM TYPES

  loadAllRoomTypes$ = createEffect(() =>
    this._actions$.pipe(
      ofType(invokeRoomTypeAPI),
      withLatestFrom(this._store.pipe(select(selectRoomTypes))),
      mergeMap(([, roomTypeFromStore]) => {
        if (roomTypeFromStore.length > 0) {
          return EMPTY;
        }
        return this._roomService
          .getRoomTypes()
          .pipe(map((data) => roomTypeFetchAPISuccess({ allRoomTypes: data })));
      })
    )
  );

  //
}
