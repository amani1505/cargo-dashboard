import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { AppState } from 'src/app/shared/store/app-state';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { ProductsService } from '../products.service';
import {
  invokeProductsAPI,
  invokeSaveNewProductsAPI,
  productsFetchAPISuccess,
  saveProductsAPISuccess,
} from './products.action';
import { selectProducts } from './products.selector';

@Injectable()
export class ProductsEffect {
  constructor(
    private _actions$: Actions,
    private _productsService: ProductsService,
    private _store: Store,
    private _appStore: Store<AppState>
  ) {}

  saveNewProduct$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(invokeSaveNewProductsAPI),
      switchMap((action) => {
        this._appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this._productsService.createProduct(action.newProduct).pipe(
          map((data) => {
            this._appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveProductsAPISuccess({
              newProduct: data,
            });
          })
        );
      })
    );
  });

  loadAllProducts$ = createEffect(() =>
    this._actions$.pipe(
      ofType(invokeProductsAPI),
      withLatestFrom(this._store.pipe(select(selectProducts))),
      mergeMap(([, productsFromStore]) => {
        if (productsFromStore.length > 0) {
          return EMPTY;
        }
        return this._productsService
          .getAllProducts()
          .pipe(map((data) => productsFetchAPISuccess({ allProducts: data })));
      })
    )
  );
}
