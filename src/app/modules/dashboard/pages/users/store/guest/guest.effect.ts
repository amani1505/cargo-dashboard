import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../../users.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app-state';
import { guestFetchAPISuccess, invokeGuestsAPI } from './guest.action';
import { EMPTY, map, mergeMap, withLatestFrom } from 'rxjs';
import { selectGuests } from './guest.selector';

@Injectable()
export class GuestEffect {
  constructor(
    private _actions$: Actions,
    private _usersService: UsersService,
    private _store: Store,
    private _appStore: Store<AppState>
  ) {}

  // READ
  loadAllGuests$ = createEffect(() =>
    this._actions$.pipe(
      ofType(invokeGuestsAPI),
      withLatestFrom(this._store.pipe(select(selectGuests))),
      mergeMap(([, guestsFromStore]) => {
        if (guestsFromStore.length > 0) {
          return EMPTY;
        }
        return this._usersService
          .getGuests()
          .pipe(map((data) => guestFetchAPISuccess({ allGuests: data })));
      })
    )
  );
}
