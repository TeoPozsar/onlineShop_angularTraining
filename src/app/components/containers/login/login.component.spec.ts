import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

import { Login } from './login.component';
import { AuthService } from '../../../services/auth';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let login: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    login = vi.fn();

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        { provide: AuthService, useValue: { login } },
        { provide: Router, useValue: { navigate: vi.fn() } },
        { provide: Store, useValue: { dispatch: vi.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    component.loginForm.setValue({ username: 'user', password: 'password' });
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays the login error when authentication fails', () => {
    login.mockReturnValue(throwError(() => new Error('authentication failed')));

    component['onLogin']();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.error-message')?.textContent.trim()).toBe(
      'Invalid username or password',
    );
  });

  it('clears the login error before a subsequent login attempt', () => {
    login
      .mockReturnValueOnce(throwError(() => new Error('authentication failed')))
      .mockReturnValueOnce(of({ access_token: 'token' }));

    component['onLogin']();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.error-message')).not.toBeNull();

    component['onLogin']();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.error-message')).toBeNull();
  });
});
