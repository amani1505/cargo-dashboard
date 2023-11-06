import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app-state';
import { UsersService } from '../../users.service';
import {
  employeesFetchAPISuccess,
  invokeEmployeesAPI,
} from './employee.action';
import { EMPTY, map, mergeMap, withLatestFrom } from 'rxjs';
import { selectEmployees } from './employee.selector';

@Injectable()
export class EmployeeEffect {
  constructor(
    private _actions$: Actions,
    private _usersService: UsersService,
    private _store: Store,
    private _appStore: Store<AppState>
  ) {}

  // READ
  loadAllEmployees$ = createEffect(() =>
    this._actions$.pipe(
      ofType(invokeEmployeesAPI),
      withLatestFrom(this._store.pipe(select(selectEmployees))),
      mergeMap(([, employeesFromStore]) => {
        if (employeesFromStore.length > 0) {
          return EMPTY;
        }
        return this._usersService
          .getEmployees()
          .pipe(
            map((data) => employeesFetchAPISuccess({ allEmployees: data }))
          );
      })
    )
  );
}
