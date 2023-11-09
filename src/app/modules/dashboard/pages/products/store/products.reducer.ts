import { createReducer, on } from '@ngrx/store';
import { Products } from './products';
import {
  deleteProductAPISuccess,
  productsFetchAPISuccess,
  saveProductsAPISuccess,
  updateProductAPISucess,
} from './products.action';

export const productsInitialState: ReadonlyArray<Products> = [];

export const productsReducer = createReducer(
  productsInitialState,
  on(saveProductsAPISuccess, (state, { newProduct }) => {
    let newState = [...state];
    newState.unshift(newProduct);
    return newState;
  }),
  on(productsFetchAPISuccess, (state, { allProducts }) => {
    return allProducts;
  }),

  on(updateProductAPISucess, (state, { updateProduct }) => {
    let newState = state.filter((_) => _.id != updateProduct.id);
    newState.unshift(updateProduct);
    return newState;
  }),

  on(deleteProductAPISuccess, (state, { id }) => {
    let newState = state.filter((_) => _.id != id);
    return newState;
  })
);
