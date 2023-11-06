import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LodgesService } from '../../lodges.service';
import { Store, select } from '@ngrx/store';
import {
  invokeLodgesAPI,
  invokeSaveNewLodgeAPI,
  lodgesFetchAPISuccess,
  saveLodgeAPISuccess,
} from './lodge.action';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { selectLodges } from './lodge.selectror';
import { AppState } from 'src/app/shared/store/app-state';
import { setAPIStatus } from 'src/app/shared/store/app.action';

@Injectable()
export class LodgeEffect {
  constructor(
    private _actions$: Actions,
    private _lodgesService: LodgesService,
    private _store: Store,
    private _appStore: Store<AppState>
  ) {}

  //CREATE NEW LODGE

  saveNewLodge$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(invokeSaveNewLodgeAPI),
      switchMap((action) => {
        this._appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this._lodgesService.createLodge(action.newLodge).pipe(
          map((data) => {
            this._appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveLodgeAPISuccess({ newLodge: data });
          })
        );
      })
    );
  });

  //READ LODGES
  loadAllLodges$ = createEffect(() =>
    this._actions$.pipe(
      ofType(invokeLodgesAPI),
      withLatestFrom(this._store.pipe(select(selectLodges))),
      mergeMap(([, lodgefromStore]) => {
        if (lodgefromStore.length > 0) {
          return EMPTY;
        }
        return this._lodgesService
          .getLodge()
          .pipe(map((data) => lodgesFetchAPISuccess({ allLodges: data })));
      })
    )
  );
}
