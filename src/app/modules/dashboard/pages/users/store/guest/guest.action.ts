import { createAction, props } from '@ngrx/store';
import { Guest } from './guest';

// READ
export const invokeGuestsAPI = createAction(
  '[Guest API] Invoke Fetch Guests API'
);

export const guestFetchAPISuccess = createAction(
  '[Guests API] Fetch Guests API Success',
  props<{ allGuests: Guest[] }>()
);
