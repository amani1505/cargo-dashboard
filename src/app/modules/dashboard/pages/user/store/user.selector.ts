import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from './user';

export const selectUsers = createFeatureSelector<User[]>('users');

export const selectUserById = (userById: string) =>
  createSelector(selectUsers, (user: User[]) => {
    var userId = user.filter((_) => _.id == userById);
    if (userId.length == 0) {
      return null;
    }
    return userId[0];
  });
