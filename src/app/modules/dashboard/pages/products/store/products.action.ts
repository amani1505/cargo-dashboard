import { createAction, props } from '@ngrx/store';
import { Products } from './products';

//  CREATE
export const invokeSaveNewProductsAPI = createAction(
  '[Products API] Invoke save new Products  api',
  props<{ newProduct: any }>()
);

export const saveProductsAPISuccess = createAction(
  '[Products API] save new Products API Success',
  props<{ newProduct: any }>()
);

//  READ
export const invokeProductsAPI = createAction(
  '[Products API] Invoke Fetch Products API'
);

export const productsFetchAPISuccess = createAction(
  '[Products API] Fetch Products API Success',
  props<{ allProducts: Products[] }>()
);

// UPDATE
export const invokeUpdateProductAPI = createAction(
  '[Products API] Inovke update Product api',
  props<{ updateProduct: any }>()
);

export const updateProductAPISucess = createAction(
  '[Products API] update  Product success',
  props<{ updateProduct: any }>()
);

// DELETE
export const invokeDeleteProductAPI = createAction(
  '[Products API] Inovke delete Product api',
  props<{ id: string }>()
);

export const deleteProductAPISuccess = createAction(
  '[Products API] deleted Product api success',
  props<{ id: string }>()
);