import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { AppState } from 'src/app/shared/store/app-state';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { UserService } from '../user.service';
import {
  userFetchAPISuccess,
  deleteUserAPISuccess,
  invokeUserAPI,
  invokeDeleteUserAPI,
  invokeSaveNewUserAPI,
  invokeUpdateUserAPI,
  saveUserAPISuccess,
  updateUserAPISucess,
} from './user.action';
import { selectUsers } from './user.selector';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Injectable()
export class UserEffect {
  constructor(
    private _actions$: Actions,
    private _userService: UserService,
    private _store: Store,
    private _authService: AuthService,
    private _appStore: Store<AppState>
  ) {}

  saveNewUser$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(invokeSaveNewUserAPI),
      switchMap((action) => {
        this._appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this._authService.signUp(action.newUser).pipe(
          map((data) => {
            this._appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveUserAPISuccess({ newUser: data });
          })
        );
      })
    );
  });

  loadAllUsers$ = createEffect(() =>
    this._actions$.pipe(
      ofType(invokeUserAPI),
      withLatestFrom(this._store.pipe(select(selectUsers))),
      mergeMap(([, userFromStore]) => {
        if (userFromStore.length > 0) {
          return EMPTY;
        }
        return this._userService.getAllUser().pipe(
          map((data) => {
            return userFetchAPISuccess({ allUsers: data });
          })
        );
      })
    )
  );

  updateUserAPI$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(invokeUpdateUserAPI),
      switchMap((action) => {
        this._appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this._userService.updateUser(action.updateUser).pipe(
          map((data) => {
            this._appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return updateUserAPISucess({
              updateUser: data,
            });
          })
        );
      })
    );
  });

  deleteUserAPI$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(invokeDeleteUserAPI),
      switchMap((actions) => {
        this._appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this._userService.deleteUser(actions.id).pipe(
          map(() => {
            this._appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return deleteUserAPISuccess({ id: actions.id });
          })
        );
      })
    );
  });
}
