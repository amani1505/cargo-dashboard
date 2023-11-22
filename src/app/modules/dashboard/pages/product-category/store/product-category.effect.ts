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
import { AuthService } from 'src/app/modules/auth/auth.service';

@Injectable()
export class ProductCategoryEffect {
  constructor(
    private _actions$: Actions,
    private _productCategoryService: ProductCategoryService,
    private _store: Store,
    private _authService: AuthService,
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
        return this._productCategoryService.getAllProductCategory().pipe(
          map((data) => {
            console.log("Data",data)
            let role = this._authService.role;
            let instituteId = this._authService.instituteId;
            if (role === 'admin') {
              const productCategory = data.filter(
                (productCategory) =>
                  productCategory?.institute.id === instituteId
              );
              console.log("Product Category",productCategory)

              return productCategoryFetchAPISuccess({
                allProductCategories: productCategory,
              });
            } else if (role === 'super_admin') {
              return productCategoryFetchAPISuccess({
                allProductCategories: data,
              });
            }

            return productCategoryFetchAPISuccess({
              allProductCategories: data,
            });
          })
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
              // You need to define this action

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
