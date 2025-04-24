import { FormAction } from '@analogjs/router';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService, AuthUser } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, FormAction],
  template: `
    <form method="post" (onSuccess)="onSuccess($event)" (onError)="onError($event)" class="grid gap-4 w-[400px]">
      <!-- username -->
      <mat-form-field appearance="fill">
        <mat-label>Username</mat-label>
        <input matInput name="username" [formControl]="loginForm.controls.username" />
      </mat-form-field>

      <!-- submit button -->
      <button mat-flat-button color="primary" type="submit" [disabled]="loginForm.invalid">Login</button>
    </form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  readonly loginForm = new FormGroup({
    username: new FormControl('testname', {
      validators: [Validators.required],
    }),
  });

  onSuccess(data: unknown) {
    console.log('success', data);
    // save user
    this.authService.setAuthUser(data as AuthUser);
    // redirect to home
    this.router.navigate(['/']);
  }

  onError(result?: unknown) {
    console.log('error', result);
  }
}
