import { createReducer, on } from '@ngrx/store';
import { Products } from './products';
import {
  productsFetchAPISuccess,
  saveProductsAPISuccess,
} from './products.action';

export const productsInitialState: ReadonlyArray<Products> = [];

export const productsReducer = createReducer(
  productsInitialState,
  on(productsFetchAPISuccess, (state, { allProducts }) => {
    return allProducts;
  }),
  on(saveProductsAPISuccess, (state, { newProduct }) => {
    let newState = [...state];
    newState.unshift(newProduct);
    return newState;
  })
);
