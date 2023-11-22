import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { AppState } from 'src/app/shared/store/app-state';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { CargoService } from '../cargo.service';
import {
  cargoFetchAPISuccess,
  deleteCargoAPISuccess,
  invokeCargoAPI,
  invokeDeleteCargoAPI,
  invokeSaveNewCargoAPI,
  invokeUpdateCargoAPI,
  saveCargoAPISuccess,
  updateCargoAPISucess,
} from './cargo.action';
import { selectCargos } from './cargo.selector';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Injectable()
export class CargoEffect {
  // role:string
  // instituteId:string
  constructor(
    private _actions$: Actions,
    private _cargoService: CargoService,
    private _store: Store,
    private _authService: AuthService,
    private _appStore: Store<AppState>
  ) {
    //  this. role = localStorage.getItem('role');
    //   this.instituteId = localStorage.getItem('instituteId');
  }

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
        return this._cargoService.getAllCargo().pipe(
          map((data) => {
            let role = this._authService.role;
            let instituteId = this._authService.instituteId;
            if (role === 'admin') {
              const cargo = data.filter(
                (cargo) => cargo.institute.id === instituteId
              );

              return cargoFetchAPISuccess({ allCargos: cargo });
            } else if (role === 'super_admin') {
              return cargoFetchAPISuccess({ allCargos: data });
            }

            return cargoFetchAPISuccess({ allCargos: data });
          })
        );
      })
    )
  );

  updateCargoAPI$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(invokeUpdateCargoAPI),
      switchMap((action) => {
        this._appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this._cargoService
          .updateCargo(action.id, action.updateCargo)
          .pipe(
            map((data) => {
              this._appStore.dispatch(
                setAPIStatus({
                  apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
                })
              );
              return updateCargoAPISucess({
                updateCargo: data,
              });
            })
          );
      })
    );
  });

  deleteCargoAPI$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(invokeDeleteCargoAPI),
      switchMap((actions) => {
        this._appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this._cargoService.deleteCargo(actions.id).pipe(
          map(() => {
            this._appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return deleteCargoAPISuccess({ id: actions.id });
          })
        );
      })
    );
  });
}
