import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './auth';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('removes the authentication token on logout', () => {
    localStorage.setItem('jwt', 'token');

    service.logout();

    expect(service.getToken()).toBeNull();
    expect(service.isLoggedIn()).toBe(false);
  });
});
