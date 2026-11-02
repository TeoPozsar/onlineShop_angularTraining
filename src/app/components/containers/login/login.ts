import { Component , ChangeDetectionStrategy , inject } from '@angular/core';
import { AuthService } from '../../../services/auth';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule , Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loadUser } from '../../../features/user/state/user.actions';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [ReactiveFormsModule , MatButtonModule],
  selector: 'app-login',
  standalone : true,
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.html',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);

  readonly loginForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  protected errorMessage = '';

  protected onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.errorMessage = '';

    this.authService.login(this.loginForm.getRawValue()).subscribe({

      next: () => {
        this.store.dispatch(loadUser());
        void this.router.navigate(['/products']);
      },

      error: (error) => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}
