import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';
import { AppState } from 'src/app/shared/store/app-state';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { ProductCategoryService } from '../product-category.service';
import {
  deleteProductCategoryAPISuccess,
  invokeDeleteProductCategoryAPI,
  invokeProductCategoryAPI,
  invokeSaveNewProductCategoryAPI,
  invokeUpdateProductCategoryAPI,
  productCategoryFetchAPISuccess,
  saveProductCategoryAPISuccess,
  updateProductCategoryAPISucess,
} from './product-category.action';
import { selectProductCategories } from './product-category.selector';

@Injectable()
export class ProductCategoryEffect {
  constructor(
    private _actions$: Actions,
    private _productCategoryService: ProductCategoryService,
    private _store: Store,
    private _appStore: Store<AppState>
  ) {}

  saveNewProductCategory$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(invokeSaveNewProductCategoryAPI),
      switchMap((action) => {
        this._appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );

        return this._productCategoryService
          .createProductCategory(action.newProductCategory)
          .pipe(
            map((data) => {
              this._appStore.dispatch(
                setAPIStatus({
                  apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
                })
              );

              return saveProductCategoryAPISuccess({
                newProductCategory: data,
              });
            })
          );
      })
    );
  });

  loadAllProductCategories$ = createEffect(() =>
    this._actions$.pipe(
      ofType(invokeProductCategoryAPI),
      withLatestFrom(this._store.pipe(select(selectProductCategories))),
      mergeMap(([, productCategoryFromStore]) => {
        if (productCategoryFromStore.length > 0) {
          return EMPTY;
        }
        return this._productCategoryService
          .getAllProductCategory()
          .pipe(
            map((data) =>
              productCategoryFetchAPISuccess({ allProductCategories: data })
            )
          );
      })
    )
  );

  updateProductCategoryAPI$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(invokeUpdateProductCategoryAPI),
      switchMap((action) => {
        this._appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this._productCategoryService
          .updateProductCategory(action.updateProductCategory)
          .pipe(
            map((data) => {
              this._appStore.dispatch(
                setAPIStatus({
                  apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
                })
              );
              return updateProductCategoryAPISucess({
                updateProductCategory: data,
              });
            })
          );
      })
    );
  });

  deleteProductCategoryAPI$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(invokeDeleteProductCategoryAPI),
      switchMap((actions) => {
        this._appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this._productCategoryService
          .deleteProductCategory(actions.id)
          .pipe(
            map(() => {
              this._appStore.dispatch(
                setAPIStatus({
                  apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
                })
              );
              return deleteProductCategoryAPISuccess({ id: actions.id });
            })
          );
      })
    );
  });
}
