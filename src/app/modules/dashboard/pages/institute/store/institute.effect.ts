import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { AppState } from 'src/app/shared/store/app-state';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { InstituteService } from '../institute.service';
import {
  InstituteFetchAPISuccess,
  deleteInstituteAPISuccess,
  invokeInstituteAPI,
  invokeDeleteInstituteAPI,
  invokeSaveNewInstituteAPI,
  invokeUpdateInstituteAPI,
  saveInstituteAPISuccess,
  updateInstituteAPISucess,
} from './institute.action';
import { selectInstitutes } from './institute.selector';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Injectable()
export class InstituteEffect {
  constructor(
    private _actions$: Actions,
    private _instituteService: InstituteService,
    private _store: Store,
    private _authService: AuthService,
    private _appStore: Store<AppState>
  ) {}

  saveNewInstitute$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(invokeSaveNewInstituteAPI),
      switchMap((action) => {
        this._appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this._instituteService.createInstitute(action.newInstitute).pipe(
          map((data) => {
            this._appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveInstituteAPISuccess({ newInstitute: data });
          })
        );
      })
    );
  });

  loadAllInstitutes$ = createEffect(() =>
    this._actions$.pipe(
      ofType(invokeInstituteAPI),
      withLatestFrom(this._store.pipe(select(selectInstitutes))),
      mergeMap(([, InstituteFromStore]) => {
        if (InstituteFromStore.length > 0) {
          return EMPTY;
        }
        return this._instituteService.getAllInstitute().pipe(
          map((data) => {
            return InstituteFetchAPISuccess({ allInstitutes: data });
          })
        );
      })
    )
  );

  updateInstituteAPI$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(invokeUpdateInstituteAPI),
      switchMap((action) => {
        this._appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this._instituteService
          .updateInstitute(action.updateInstitute)
          .pipe(
            map((data) => {
              this._appStore.dispatch(
                setAPIStatus({
                  apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
                })
              );
              return updateInstituteAPISucess({
                updateInstitute: data,
              });
            })
          );
      })
    );
  });

  deleteInstituteAPI$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(invokeDeleteInstituteAPI),
      switchMap((actions) => {
        this._appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this._instituteService.deleteInstitute(actions.id).pipe(
          map(() => {
            this._appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return deleteInstituteAPISuccess({ id: actions.id });
          })
        );
      })
    );
  });
}
