
import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
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

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private readonly tokenKey = 'jwt';

  private readonly currentUserSignal = signal<AuthUser | null>(null);
  readonly currentUser = this.currentUserSignal.asReadonly();

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
    this.getProfile().subscribe({
      next: (user) => this.currentUserSignal.set(user),
      error: () => this.currentUserSignal.set(null),
    });
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSignal.set(null);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
