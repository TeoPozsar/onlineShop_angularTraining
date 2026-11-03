import { createReducer, on } from '@ngrx/store';

import {
  clearUser,
  loadUser,
  loadUserSuccess,
  loadUserFailure,
} from './user.actions';

import {
  UserState,
  initialUserState,
} from './user.state';

export const userReducer = createReducer<UserState>(
  initialUserState,

  on(loadUser, (state) => ({
    ...state,
    user: null,
    loading: true,
    error: null,
  })),

  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
  })),

  on(loadUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(clearUser, () => initialUserState),
);
