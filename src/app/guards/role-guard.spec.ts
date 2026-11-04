import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { provideRouter } from '@angular/router';
import { AuthService, AuthUser } from '../services/auth';
import { roleGuard } from './role-guard';

const ADMIN: AuthUser = {
  id: '1',
  username: 'blackj',
  fullname: 'Jack Black',
  roles: ['user', 'admin'],
};

const CUSTOMER: AuthUser = {
  id: '2',
  username: 'doej',
  fullname: 'John Doe',
  roles: ['user', 'customer'],
};

const PLAIN_USER: AuthUser = {
  id: '3',
  username: 'whiteb',
  fullname: 'Ben White',
  roles: ['user'],
};

describe('roleGuard', () => {
  const customerGuard = roleGuard(['user', 'customer'], {
    deniedRoles: ['admin'],
  });

  const run = (guard: CanActivateFn) =>
    TestBed.runInInjectionContext(() =>
      guard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
    );

  const setUser = (user: AuthUser | null) => {
    const auth = TestBed.inject(AuthService);
    (auth as unknown as { currentUserSignal: { set(v: AuthUser | null): void } })
      .currentUserSignal.set(user);
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideRouter([])],
    });
    localStorage.setItem('jwt', 'token');
  });

  afterEach(() => localStorage.removeItem('jwt'));

  it('allows a customer into customer-only routes', () => {
    setUser(CUSTOMER);
    expect(run(customerGuard)).toBe(true);
  });

  it('allows a plain user into customer-only routes', () => {
    setUser(PLAIN_USER);
    expect(run(customerGuard)).toBe(true);
  });

  it('redirects an admin to /products', () => {
    setUser(ADMIN);
    const result = run(customerGuard) as UrlTree;
    expect(result instanceof UrlTree).toBe(true);
    expect(TestBed.inject(Router).serializeUrl(result)).toBe('/products');
  });

  it('still allows an admin into admin-only routes', () => {
    setUser(ADMIN);
    expect(run(roleGuard(['admin']))).toBe(true);
  });

  it('redirects a customer away from admin-only routes', () => {
    setUser(CUSTOMER);
    const result = run(roleGuard(['admin'])) as UrlTree;
    expect(TestBed.inject(Router).serializeUrl(result)).toBe('/products');
  });

  it('redirects anonymous visitors to /login', () => {
    localStorage.removeItem('jwt');
    setUser(null);
    const result = run(customerGuard) as UrlTree;
    expect(TestBed.inject(Router).serializeUrl(result)).toBe('/login');
  });
});

describe('AuthService role helpers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
  });

  const setUser = (user: AuthUser | null) => {
    const auth = TestBed.inject(AuthService);
    (auth as unknown as { currentUserSignal: { set(v: AuthUser | null): void } })
      .currentUserSignal.set(user);
    return auth;
  };

  it('flags admins as admin and not customer', () => {
    const auth = setUser(ADMIN);
    expect(auth.isAdmin()).toBe(true);
    expect(auth.isCustomer()).toBe(false);
  });

  it('flags non-admin users as customer', () => {
    const auth = setUser(PLAIN_USER);
    expect(auth.isAdmin()).toBe(false);
    expect(auth.isCustomer()).toBe(true);
  });

  it('treats anonymous visitors as neither', () => {
    const auth = setUser(null);
    expect(auth.isAdmin()).toBe(false);
    expect(auth.isCustomer()).toBe(false);
  });
});
