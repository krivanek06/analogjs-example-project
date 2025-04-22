import { injectContentFiles } from '@analogjs/content';
import { Component, inject, signal } from '@angular/core';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { combineLatest, map, switchMap } from 'rxjs';
import { AnimeApiService } from '../services/anime-api.service';
import { AuthService } from '../services/auth.service';
import { AnimeDetails } from './../../server/api/api.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatSelectModule, FormsModule, MatProgressSpinnerModule],
  template: `
    <div class="lg:p-10 max-w-[1440px] mx-auto">
      <!-- blog posts -->
      <h2 class="text-2xl font-bold mb-4">Blog Post</h2>
      <div class="my-8 flex justify-evenly">
        @for (post of posts; track post.attributes.title) {
          <div
            [routerLink]="['/blog', post.slug]"
            class="border shadow-lg rounded-lg grid gap-4 relative overflow-clip cursor-pointer hover:scale-105 duration-300 transition-all max-h-[200px] max-w-[300px]">
            <img [src]="post.attributes.coverImage" class="object-cover" />
            <div class="absolute bottom-0 bg-black opacity-75 w-full p-2">Blogpost - {{ post.attributes.title }}</div>
          </div>
        }
      </div>

      <div class="mb-4 flex justify-between">
        <!-- anime genres -->
        <mat-form-field appearance="fill">
          <mat-label>Anime Genres</mat-label>
          <mat-select [(ngModel)]="searchGenreId">
            @for (item of animeGenres.value(); track item.mal_id) {
              <mat-option [value]="item.mal_id">{{ item.name }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <!-- login -->
        <div class="flex gap-4">
          @if (!authUser()) {
            <button type="button" routerLink="/login" mat-flat-button>Login</button>
          } @else {
            <button type="button" mat-stroked-button routerLink="/my-list">Liked Anime List</button>
            <button type="button" mat-stroked-button routerLink="/unknown">Non Existing Route</button>
            <button type="button" mat-flat-button (click)="onLogout()">logout</button>
          }
        </div>
      </div>

      <!-- list of anime -->
      <h2 class="text-2xl font-bold mb-4">Anime List</h2>
      <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        @for (item of animeDisplay(); track $index) {
          <div class="relative bg-black rounded-lg shadow-lg grid">
            <div class="flex justify-between my-2">
              <!-- navigation -->
              <button mat-button routerLink="/details/{{ item.mal_id }}">visit</button>

              <!-- like/dislike -->
              @if (authUser()) {
                @if (item.isLiked) {
                  <button mat-stroked-button type="button" (click)="dislikeAnime(item)">dislike</button>
                } @else {
                  <button mat-button type="button" (click)="likeAnime(item)">like</button>
                }
              }
            </div>

            <div
              class="rounded-xl shadow-lg bg-gray-600 hover:scale-105 transition-transform duration-300 cursor-pointer relative">
              <!-- image -->
              <img [src]="item.images.webp.image_url" class="w-full h-full object-cover" />

              <!-- title -->
              <div class="absolute bg-black opacity-85 text-white p-4 bottom-0 w-full text-center">
                {{ item.title_english ?? item.title }}
              </div>
            </div>
          </div>
        } @empty {
          <div class="col-span-6 flex justify-center">
            <mat-spinner />
          </div>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export default class HomeComponent {
  private readonly animeApiService = inject(AnimeApiService);
  private readonly authService = inject(AuthService);

  readonly authUser = this.authService.authUser;

  readonly searchGenreId = signal<number>(0);

  readonly posts = injectContentFiles<{
    title: string;
    tags: string;
    datePublished: string;
    coverImage: string;
  }>(contentFiles => contentFiles.filename.includes('/src/content/blog'));

  readonly animeGenres = rxResource({
    loader: () => this.animeApiService.getAnimeGenres(),
  });

  readonly animeDisplay = toSignal(
    combineLatest([
      // resolve displayed anime
      toObservable(this.searchGenreId).pipe(
        switchMap(genreId =>
          genreId === 0 ? this.animeApiService.getTopAiringAnime() : this.animeApiService.searchAnime(genreId)
        )
      ),
      // listen on liked anime
      toObservable(this.authService.likedAnime),
    ]).pipe(
      // check which anime is liked
      map(([anime, likedAnime]) => {
        const likedIds = new Set(likedAnime.map(anime => anime.mal_id));
        return anime.map(anime => ({
          ...anime,
          isLiked: likedIds.has(anime.mal_id),
        }));
      })
    ),
    { initialValue: [] }
  );

  onLogout() {
    this.authService.logout();
  }

  likeAnime(anime: AnimeDetails) {
    this.animeApiService
      .saveAnime(anime.mal_id, this.authUser()?.username ?? '')
      .subscribe(res => this.authService.addLikedAnime(res.data));
  }

  dislikeAnime(anime: AnimeDetails) {
    this.animeApiService
      .removeAnime(anime.mal_id, this.authUser()?.username ?? '')
      .subscribe(() => this.authService.removeLikedAnime(anime.mal_id));
  }
}
