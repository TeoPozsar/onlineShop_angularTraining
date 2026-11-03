import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject, Subject } from 'rxjs';
import { AuthService, AuthUser } from '../../../services/auth';
import { clearUser, loadUser } from './user.actions';
import { UserEffects } from './user.effects';

describe('UserEffects', () => {
  let actions$: ReplaySubject<ReturnType<typeof loadUser> | ReturnType<typeof clearUser>>;
  let profile$: Subject<AuthUser>;

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    profile$ = new Subject();

    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        {
          provide: AuthService,
          useValue: {
            getProfile: () => profile$,
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
});
