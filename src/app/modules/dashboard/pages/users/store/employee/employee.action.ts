import { createAction, props } from '@ngrx/store';
import { Employee } from './employee';

// READ
export const invokeEmployeesAPI = createAction(
  '[Employee API] Invoke Fetch Employees API'
);

export const employeesFetchAPISuccess = createAction(
  '[Employee API] Fetch Employee API Success',
  props<{ allEmployees: Employee[] }>()
);
