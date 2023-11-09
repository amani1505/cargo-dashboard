import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { AppState } from 'src/app/shared/store/app-state';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { CustomerService } from '../customer.service';
import {
  customerFetchAPISuccess,
  deleteCustomerAPISuccess,
  invokeCustomerAPI,
  invokeDeleteCustomerAPI,
  invokeSaveNewCustomerAPI,
  invokeUpdateCustomerAPI,
  saveCustomerAPISuccess,
  updateCustomerAPISucess,
} from './customer.action';
import { selectCustomers } from './customer.selector';

@Injectable()
export class CustomerEffect {
  constructor(
    private _actions$: Actions,
    private _customerService: CustomerService,
    private _store: Store,
    private _appStore: Store<AppState>
  ) {}

  saveNewCustomer$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(invokeSaveNewCustomerAPI),
      switchMap((action) => {
        this._appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this._customerService.createCustomer(action.newCustomer).pipe(
          map((data) => {
            this._appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveCustomerAPISuccess({ newCustomer: data });
          })
        );
      })
    );
  });

  loadAllCustomers$ = createEffect(() =>
    this._actions$.pipe(
      ofType(invokeCustomerAPI),
      withLatestFrom(this._store.pipe(select(selectCustomers))),
      mergeMap(([, customerFromStore]) => {
        if (customerFromStore.length > 0) {
          return EMPTY;
        }
        return this._customerService
          .getAllCustomer()
          .pipe(map((data) => customerFetchAPISuccess({ allCustomers: data })));
      })
    )
  );

  updateCustomerAPI$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(invokeUpdateCustomerAPI),
      switchMap((action) => {
        this._appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this._customerService.updateCustomer(action.updateCustomer).pipe(
          map((data) => {
            this._appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return updateCustomerAPISucess({
              updateCustomer: data,
            });
          })
        );
      })
    );
  });

  deleteCustomerAPI$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(invokeDeleteCustomerAPI),
      switchMap((actions) => {
        this._appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this._customerService.deleteCustomer(actions.id).pipe(
          map(() => {
            this._appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return deleteCustomerAPISuccess({ id: actions.id });
          })
        );
      })
    );
  });
}
