
import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map, switchMap, take, tap } from 'rxjs';
import { AuthService, AuthUser } from '../services/auth';
import {
  selectCurrentUser,
  selectUserLoading,
} from '../features/user/state/user.selectors';
import { loadUser } from '../features/user/state/user.actions';

export interface RoleGuardOptions {
  deniedRoles?: string[];
}

export const roleGuard =
  (allowedRoles: string[], options: RoleGuardOptions = {}): CanActivateFn =>
    () => {
      const authService = inject(AuthService);
      const store = inject(Store);
      const router = inject(Router);
      const deniedRoles = options.deniedRoles ?? [];

      const decide = (user: AuthUser | null): boolean | UrlTree => {
        if (!user) {
          return router.createUrlTree(['/login']);
        }

        const isDenied = user.roles.some((role) =>
          deniedRoles.includes(role),
        );
        const isAllowed = user.roles.some((role) =>
          allowedRoles.includes(role),
        );

        return !isDenied && isAllowed
          ? true
          : router.createUrlTree(['/products']);
      };

      if (!authService.isLoggedIn()) {
        return router.createUrlTree(['/login']);
      }

      return combineLatest([
        store.select(selectCurrentUser),
        store.select(selectUserLoading),
      ]).pipe(
        take(1),
        tap(([user, loading]) => {
          if (!user && !loading) {
            store.dispatch(loadUser());
          }
        }),
        switchMap(() =>
          combineLatest([
            store.select(selectCurrentUser),
            store.select(selectUserLoading),
          ]).pipe(
            filter(([user, loading]) => user !== null || !loading),
            take(1),
            map(([user]) => decide(user)),
          ),
        ),
      );
    };
