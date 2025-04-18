import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, MatButtonModule, RouterLink],
  template: ` <div class="max-w-[1280px] mx-auto">
    <h2 class="text-center text-4xl font-bold my-10">Auth Layout</h2>
    <div class="p-4 shadow-lg bg-gray-800 rounded-lg max-w-fit mx-auto">
      <!-- navigation -->
      <div class="flex gap-4 mb-6">
        <button type="button" mat-stroked-button class="w-full" routerLink="/login">login</button>
        <button type="button" mat-stroked-button class="w-full" routerLink="/register">register</button>
      </div>

      <router-outlet />
    </div>
  </div>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AuthLayoutComponent {}
