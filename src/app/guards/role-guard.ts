import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { map } from 'rxjs';
import { AuthService, AuthUser } from '../services/auth';

export interface RoleGuardOptions {
  /** Roles that are explicitly rejected even when an allowed role is present. */
  deniedRoles?: string[];
}

export const roleGuard =
  (allowedRoles: string[], options: RoleGuardOptions = {}): CanActivateFn =>
  () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const deniedRoles = options.deniedRoles ?? [];

    const decide = (user: AuthUser | null): boolean | UrlTree => {
      if (!user) {
        return router.createUrlTree(['/login']);
      }

      const isDenied = user.roles.some((role) => deniedRoles.includes(role));

      if (!isDenied && user.roles.some((role) => allowedRoles.includes(role))) {
        return true;
      }

      return router.createUrlTree(['/products']);
    };

    const currentUser = authService.currentUser();

    if (currentUser) {
      return decide(currentUser);
    }

    if (!authService.isLoggedIn()) {
      return router.createUrlTree(['/login']);
    }

    return authService.loadCurrentUser$().pipe(map(decide));
  };
