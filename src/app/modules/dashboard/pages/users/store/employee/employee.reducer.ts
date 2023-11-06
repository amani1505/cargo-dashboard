import { createReducer, on } from '@ngrx/store';
import { Employee } from './employee';
import { employeesFetchAPISuccess } from './employee.action';

export const initialState: ReadonlyArray<Employee> = [];

export const employeeReducer = createReducer(
  initialState,
  on(employeesFetchAPISuccess, (state, { allEmployees }) => {
    return allEmployees;
  })
);
