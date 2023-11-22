import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { AppState } from 'src/app/shared/store/app-state';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { ProductsService } from '../products.service';
import {
  deleteProductAPISuccess,
  invokeDeleteProductAPI,
  invokeProductsAPI,
  invokeSaveNewProductsAPI,
  invokeUpdateProductAPI,
  productsFetchAPISuccess,
  saveProductsAPISuccess,
  updateProductAPISucess,
} from './products.action';
import { selectProducts } from './products.selector';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Injectable()
export class ProductsEffect {
  constructor(
    private _actions$: Actions,
    private _productsService: ProductsService,
    private _store: Store,
    private _authService: AuthService,
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
        return this._productsService.getAllProducts().pipe(
          map((data) => {
            let role = this._authService.role;
            let instituteId = this._authService.instituteId;
            if (role === 'admin') {
              const products = data.filter(
                (products) => products?.institute.id === instituteId
              );

              console.log('Products Data - admin', products);
              return productsFetchAPISuccess({
                allProducts: products,
              });
            } else if (role === 'super_admin') {
              return productsFetchAPISuccess({
                allProducts: data,
              });
            }

            return productsFetchAPISuccess({ allProducts: data });
          })
        );
      })
    )
  );

  updateProductAPI$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(invokeUpdateProductAPI),
      switchMap((action) => {
        this._appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this._productsService.updateProduct(action.updateProduct).pipe(
          map((data) => {
            this._appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return updateProductAPISucess({
              updateProduct: data,
            });
          })
        );
      })
    );
  });

  deleteProductAPI$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(invokeDeleteProductAPI),
      switchMap((actions) => {
        this._appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this._productsService.deleteProduct(actions.id).pipe(
          map(() => {
            this._appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return deleteProductAPISuccess({ id: actions.id });
          })
        );
      })
    );
  });
}
