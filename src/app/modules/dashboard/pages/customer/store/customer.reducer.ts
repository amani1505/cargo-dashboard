import { createReducer, on } from '@ngrx/store';
import { Customer } from './customer';
import {
  customerFetchAPISuccess,
  saveCustomerAPISuccess,
} from './customer.action';

export const customerInitialState: ReadonlyArray<Customer> = [];

export const customerReducer = createReducer(
    customerInitialState,
  on(customerFetchAPISuccess, (state, { allCustomers }) => {
    return allCustomers;
  }),
  on(saveCustomerAPISuccess, (state, { newCustomer }) => {
    let newState = [...state];
    newState.unshift(newCustomer);
    return newState;
  })
);
