import { FormAction } from '@analogjs/router';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService, AuthUser } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, FormAction],
  template: `
    <form method="post" (onSuccess)="onSuccess($event)" (onError)="onError($event)" class="grid gap-4 w-[400px]">
      <!-- username -->
      <mat-form-field appearance="fill">
        <mat-label>Username</mat-label>
        <input matInput name="username1" [formControl]="loginForm.controls.username1" />
      </mat-form-field>

      <!-- username -->
      <mat-form-field appearance="fill">
        <mat-label>Username (Repeat)</mat-label>
        <input matInput name="username2" [formControl]="loginForm.controls.username2" />
      </mat-form-field>

      @if (loginForm.errors?.['match']) {
        <p class="text-red-500 text-sm">{{ loginForm.errors?.['match'] }}</p>
      }

      <!-- submit button -->
      <button mat-flat-button color="primary" type="submit" [disabled]="loginForm.invalid">Register</button>
    </form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  readonly loginForm = new FormGroup(
    {
      username1: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
      }),
      username2: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
      }),
    },
    {
      validators: control => {
        const username1 = control.get('username1')?.value;
        const username2 = control.get('username2')?.value;

        if (username1 !== '' && username1 !== username2) {
          return { match: `value ${username1} is not equal to ${username2}` };
        }

        return null;
      },
    }
  );

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
