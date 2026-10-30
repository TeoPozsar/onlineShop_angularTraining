import { createAction, props } from '@ngrx/store';
import { AuthUser } from '../../../services/auth';


export const loadUser = createAction(
  '[User] Load User',
);


export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: AuthUser }>(),
);


export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: string }>(),
);
