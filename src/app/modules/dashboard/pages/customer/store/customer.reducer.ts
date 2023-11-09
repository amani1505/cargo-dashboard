import { createReducer, on } from '@ngrx/store';
import { Customer } from './customer';
import {
  customerFetchAPISuccess,
  deleteCustomerAPISuccess,
  saveCustomerAPISuccess,
  updateCustomerAPISucess,
} from './customer.action';

export const customerInitialState: ReadonlyArray<Customer> = [];

export const customerReducer = createReducer(
  customerInitialState,
  on(saveCustomerAPISuccess, (state, { newCustomer }) => {
    let newState = [...state];
    newState.unshift(newCustomer);
    return newState;
  }),

  on(customerFetchAPISuccess, (state, { allCustomers }) => {
    return allCustomers;
  }),

  on(updateCustomerAPISucess, (state, { updateCustomer }) => {
    let newState = state.filter((_) => _.id != updateCustomer.id);
    newState.unshift(updateCustomer);
    return newState;
  }),

  on(deleteCustomerAPISuccess, (state, { id }) => {
    let newState = state.filter((_) => _.id != id);
    return newState;
  })
);
