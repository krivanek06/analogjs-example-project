import { computed, Injectable, signal } from '@angular/core';

export type AuthUser = {
  username: string;
  token: string;
  userId: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _authUser = signal<AuthUser | null>(null);
  readonly authUser = computed(() => this._authUser());

  setAuthUser(user: AuthUser | null) {
    this._authUser.set(user);
  }
}
