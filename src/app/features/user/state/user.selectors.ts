import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';

export const selectUserState =
  createFeatureSelector<UserState>('user');

export const selectCurrentUser = createSelector(
  selectUserState,
  (state) => state.user,
);

export const selectUserLoading = createSelector(
  selectUserState,
  (state) => state.loading,
);

export const selectUserError = createSelector(
  selectUserState,
  (state) => state.error,
);

export const selectIsAdmin = createSelector(
  selectCurrentUser,
  (user) => user?.roles.includes('admin') ?? false,
);

export const selectIsCustomer = createSelector(
  selectCurrentUser,
  (user) =>
    user !== null &&
    !user.roles.includes('admin'),
);
