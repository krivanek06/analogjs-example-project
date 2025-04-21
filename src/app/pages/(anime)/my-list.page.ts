import { RouteMeta } from '@analogjs/router';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AnimeDetails } from './../../../server/api/api.model';
import { AnimeApiService } from './../../services/anime-api.service';
import { AuthService } from './../../services/auth.service';

export const routeMeta: RouteMeta = {
  title: 'About Analog',
  canActivate: [
    () => {
      const authUser = inject(AuthService).authUser();
      const router = inject(Router);

      if (!authUser) {
        router.navigate(['/login']);
        return false;
      }

      return true;
    },
  ],
};

@Component({
  selector: 'app-anime-my-list.page.ts',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  template: `
    <div class="lg:p-10 max-w-[1080px] mx-auto">
      <!-- back button -->
      <div class="py-4">
        <button mat-flat-button routerLink="/" type="button">Back to Home</button>
      </div>

      <!-- anime list -->
      <div class="grid gap-3">
        @for (item of likedAnime(); track item.mal_id) {
          <div class="flex items-center gap-4 border border-gray-700 rounded-lg p-4 bg-gray-700">
            <div class="flex-1">
              {{ item.title_english ?? item.title }}
            </div>
            <button mat-icon-button (click)="dislikeAnime(item)">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        }
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MyListPageComponent {
  private readonly authService = inject(AuthService);
  private readonly animeApiService = inject(AnimeApiService);
  readonly likedAnime = this.authService.likedAnime;

  dislikeAnime(anime: AnimeDetails) {
    this.animeApiService
      .removeAnime(anime.mal_id, this.authService.authUser()?.username ?? '')
      .subscribe(() => this.authService.removeLikedAnime(anime.mal_id));
  }
}
