import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject, Subject } from 'rxjs';
import { AuthService, AuthUser } from '../../../services/auth';
import { clearUser, loadUser, loadUserFailure } from './user.actions';
import { UserEffects } from './user.effects';

describe('UserEffects', () => {
  let actions$: ReplaySubject<ReturnType<typeof loadUser> | ReturnType<typeof clearUser>>;
  let profile$: Subject<AuthUser>;
  let logout: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    profile$ = new Subject();
    logout = vi.fn();

    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        {
          provide: AuthService,
          useValue: {
            getProfile: () => profile$,
            logout,
          },
        },
      ],
    });
  });

  it('does not restore an in-flight user after the state is cleared', () => {
    const emittedActions: unknown[] = [];
    TestBed.inject(UserEffects).loadUser$.subscribe((action) => {
      emittedActions.push(action);
    });

    actions$.next(loadUser());
    actions$.next(clearUser());
    profile$.next({
      id: 'user-1',
      username: 'admin',
      fullname: 'Admin User',
      roles: ['admin'],
    });

    expect(emittedActions).toEqual([]);
  });

  it('logs out and clears the user when profile loading returns 401', () => {
    const emittedActions: unknown[] = [];
    TestBed.inject(UserEffects).loadUser$.subscribe((action) => {
      emittedActions.push(action);
    });

    actions$.next(loadUser());
    profile$.error(new HttpErrorResponse({ status: 401 }));

    expect(logout).toHaveBeenCalledOnce();
    expect(emittedActions).toEqual([clearUser()]);
  });

  it('preserves the session and reports non-401 profile errors', () => {
    const emittedActions: unknown[] = [];
    const error = new HttpErrorResponse({
      status: 500,
      statusText: 'Server Error',
    });
    TestBed.inject(UserEffects).loadUser$.subscribe((action) => {
      emittedActions.push(action);
    });

    actions$.next(loadUser());
    profile$.error(error);

    expect(logout).not.toHaveBeenCalled();
    expect(emittedActions).toEqual([loadUserFailure({ error: error.message })]);
  });
});
