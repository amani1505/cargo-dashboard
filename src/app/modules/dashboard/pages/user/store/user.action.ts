import { createAction, props } from '@ngrx/store';
import { User } from './user';

//  CREATE
export const invokeSaveNewUserAPI = createAction(
  '[User API] Invoke save new User  api',
  props<{ newUser: any }>()
);

export const saveUserAPISuccess = createAction(
  '[User API] save new User API Success',
  props<{ newUser: any }>()
);

//  READ
export const invokeUserAPI = createAction(
  '[User API] Invoke Fetch User API'
);

export const userFetchAPISuccess = createAction(
  '[User API] Fetch User API Success',
  props<{ allUsers: User[] }>()
);

// UPDATE
export const invokeUpdateUserAPI = createAction(
  '[User API] Inovke update User api',
  props<{ updateUser: any }>()
);

export const updateUserAPISucess = createAction(
  '[User API] update  User success',
  props<{ updateUser: any }>()
);

// DELETE
export const invokeDeleteUserAPI = createAction(
  '[User API] Inovke delete User api',
  props<{ id: string }>()
);

export const deleteUserAPISuccess = createAction(
  '[User API] deleted User api success',
  props<{ id: string }>()
);
