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
