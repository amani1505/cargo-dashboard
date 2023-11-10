import { createReducer, on } from '@ngrx/store';
import { ProductCategory } from './product-category';
import {
  deleteProductCategoryAPISuccess,
  productCategoryFetchAPISuccess,
  saveProductCategoryAPISuccess,
  updateProductCategoryAPISucess,
} from './product-category.action';

export const productCategoryInitialState: ReadonlyArray<ProductCategory> = [];

export const productCategoryReducer = createReducer(
  productCategoryInitialState,

  on(saveProductCategoryAPISuccess, (state, { newProductCategory }) => {
    let newState = [...state];
    newState.unshift(newProductCategory);
    return newState;
  }),
  on(productCategoryFetchAPISuccess, (state, { allProductCategories }) => {
    return allProductCategories;
  }),

  on(updateProductCategoryAPISucess, (state, { updateProductCategory }) => {
  
    let newState = state.filter((_) => _.id != updateProductCategory.id);
    newState.unshift(updateProductCategory);
 
    return newState;



   
  }),

  on(deleteProductCategoryAPISuccess, (state, { id }) => {
    let newState = state.filter((_) => _.id != id);
    return newState;
  })
);
