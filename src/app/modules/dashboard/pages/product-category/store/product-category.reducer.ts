import { createReducer, on } from '@ngrx/store';
import { ProductCategory } from './product-category';
import {
  productCategoryFetchAPISuccess,
  saveProductCategoryAPISuccess,
} from './product-category.action';

export const productCategoryInitialState: ReadonlyArray<ProductCategory> = [];

export const productCategoryReducer = createReducer(
  productCategoryInitialState,
  on(productCategoryFetchAPISuccess, (state, { allProductCategories }) => {
    return allProductCategories;
  }),
  on(saveProductCategoryAPISuccess, (state, { newProductCategory }) => {
    let newState = [...state];
    newState.unshift(newProductCategory);
    return newState;
  })
);
