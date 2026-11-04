import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { provideStore, Store } from '@ngrx/store';
import { App } from './app';
import { clearUser, loadUserSuccess } from './features/user/state/user.actions';
import { userReducer } from './features/user/state/user.reducer';
import { AuthService } from './services/auth';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        provideStore({ user: userReducer }),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Online Shop');
  });

  it('logs out through AuthService and clears the user store', async () => {
    const store = TestBed.inject(Store);
    const authService = TestBed.inject(AuthService);
    const logoutSpy = vi.spyOn(authService, 'logout');
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const navigateSpy = vi.spyOn(TestBed.inject(Router), 'navigate')
      .mockResolvedValue(true);
    store.dispatch(loadUserSuccess({
      user: {
        id: 'user-1',
        username: 'admin',
        fullname: 'Admin User',
        roles: ['admin'],
      },
    }));
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();

    const logoutButton = fixture.nativeElement.querySelector(
      '.logout-row button',
    ) as HTMLButtonElement;
    logoutButton.click();

    expect(logoutSpy).toHaveBeenCalledOnce();
    expect(dispatchSpy).toHaveBeenCalledWith(clearUser());
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
