
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { AuthService } from '../../../services/auth';
import {
  loadUser,
  loadUserSuccess,
  loadUserFailure,
} from './user.actions';

@Injectable()
export class UserEffects {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      switchMap(() =>
        this.authService.loadCurrentUser$().pipe(
          map((user) =>
            user
              ? loadUserSuccess({ user })
              : loadUserFailure({
                error: 'Failed to load user profile',
              }),
          ),
          catchError((error) =>
            of(
              loadUserFailure({
                error: error.message ?? 'Failed to load user profile',
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
