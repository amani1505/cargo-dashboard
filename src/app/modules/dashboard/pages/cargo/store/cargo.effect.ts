import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { AppState } from 'src/app/shared/store/app-state';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { CargoService } from '../cargo.service';
import {
  cargoFetchAPISuccess,
  invokeCargoAPI,
  invokeSaveNewCargoAPI,
  saveCargoAPISuccess,
} from './cargo.action';
import { selectCargos } from './cargo.selector';

@Injectable()
export class CargoEffect {
  constructor(
    private _actions$: Actions,
    private _cargoService: CargoService,
    private _store: Store,
    private _appStore: Store<AppState>
  ) {}

  saveNewCargo$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(invokeSaveNewCargoAPI),
      switchMap((action) => {
        this._appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this._cargoService.createCargo(action.newCargo).pipe(
          map((data) => {
            this._appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveCargoAPISuccess({ newCargo: data });
          })
        );
      })
    );
  });

  loadAllCargo$ = createEffect(() =>
    this._actions$.pipe(
      ofType(invokeCargoAPI),
      withLatestFrom(this._store.pipe(select(selectCargos))),
      mergeMap(([, cargoFromStore]) => {
        if (cargoFromStore.length > 0) {
          return EMPTY;
        }
        return this._cargoService
          .getAllCargo()
          .pipe(map((data) => cargoFetchAPISuccess({ allCargos: data })));
      })
    )
  );
}
