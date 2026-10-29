
import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, Observable, of, shareReplay, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface AuthUser {
  id: string;
  username: string;
  fullname: string;
  roles: string[];
}

export const ADMIN_ROLE = 'admin';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private readonly tokenKey = 'jwt';

  private readonly currentUserSignal = signal<AuthUser | null>(null);
  readonly currentUser = this.currentUserSignal.asReadonly();

  readonly isAdmin = computed(() => hasAdminRole(this.currentUserSignal()));

  /** A customer is any authenticated, non-admin user. */
  readonly isCustomer = computed(() => {
    const user = this.currentUserSignal();
    return user !== null && !hasAdminRole(user);
  });

  private pendingProfileRequest: Observable<AuthUser | null> | null = null;

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response) => {
          localStorage.setItem(this.tokenKey, response.access_token);
        }),
      );
  }

  getProfile(): Observable<AuthUser> {
    return this.http.get<AuthUser>(`${this.apiUrl}/profile`);
  }

  loadCurrentUser(): void {
    this.loadCurrentUser$().subscribe();
  }

  loadCurrentUser$(): Observable<AuthUser | null> {
    if (!this.pendingProfileRequest) {
      this.pendingProfileRequest = this.getProfile().pipe(
        tap((user) => this.currentUserSignal.set(user)),
        catchError(() => {
          this.currentUserSignal.set(null);
          return of(null);
        }),
        finalize(() => (this.pendingProfileRequest = null)),
        shareReplay({ bufferSize: 1, refCount: false }),
      );
    }

    return this.pendingProfileRequest;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.pendingProfileRequest = null;
    this.currentUserSignal.set(null);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}

export function hasAdminRole(user: AuthUser | null): boolean {
  return user?.roles.includes(ADMIN_ROLE) ?? false;
}
