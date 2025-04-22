import { RouteMeta } from '@analogjs/router';
import { injectResponse } from '@analogjs/router/tokens';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

export const routeMeta: RouteMeta = {
  title: 'Page Not Found',
  canActivate: [
    () => {
      const response = injectResponse();
      if (import.meta.env.SSR && response) {
        response.statusCode = 404;
        response.end();
      }
      return true;
    },
  ],
};

@Component({
  selector: 'app-page-not-found',
  imports: [RouterLink, MatButtonModule],
  template: `
    <div class="max-w-[1280px] mx-auto h-screen flex flex-col items-center justify-center gap-10">
      <h2 class="text-2xl">Page Not Found</h2>

      <button mat-stroked-button routerLink="/">Go Back Home</button>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PageNotFoundComponent {}
