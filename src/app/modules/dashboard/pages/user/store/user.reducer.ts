import { createReducer, on } from '@ngrx/store';
import { User } from './user';
import {
  userFetchAPISuccess,
  deleteUserAPISuccess,
  saveUserAPISuccess,
  updateUserAPISucess,
} from './user.action';

export const userInitialState: ReadonlyArray<User> = [];

export const userReducer = createReducer(
  userInitialState,
  on(saveUserAPISuccess, (state, { newUser }) => {
    let newState = [...state];
    newState.unshift(newUser);
    return newState;
  }),

  on(userFetchAPISuccess, (state, { allUsers }) => {
    return allUsers;
  }),

  on(updateUserAPISucess, (state, { updateUser }) => {
    let newState = state.filter((_) => _.id != updateUser.id);
    newState.unshift(updateUser);
    return newState;
  }),

  on(deleteUserAPISuccess, (state, { id }) => {
    let newState = state.filter((_) => _.id != id);
    return newState;
  })
);
