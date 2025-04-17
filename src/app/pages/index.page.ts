import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { AnimeCardComponent } from '../components/anime-card/anime-card.component';
import { AnimeApiService } from '../services/anime-api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, AnimeCardComponent, MatSelectModule, FormsModule, MatProgressSpinnerModule],
  template: `
    <div class="lg:p-10 max-w-[1440px] mx-auto">
      <div class="mb-4 flex justify-end">
        <!-- anime genres -->
        <mat-form-field appearance="fill">
          <mat-label>Anime Genres</mat-label>
          <mat-select [(ngModel)]="searchGenreId">
            @for (item of animeGenres.value(); track item.mal_id) {
              <mat-option [value]="item.mal_id">{{ item.name }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
      </div>

      <!-- list of anime -->
      <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        @if (animeDisplay.isLoading()) {
          <div class="col-span-6 flex justify-center">
            <mat-spinner />
          </div>
        } @else if (animeDisplay.error()) {
          <div class="col-span-6 flex justify-center items-center h-[180px]">
            <p class="text-red-500">Error: {{ animeDisplay.error() }}</p>
          </div>
        } @else {
          @for (item of animeDisplay.value(); track $index) {
            <app-anime-card [animeDetails]="item" />
          }
        }
      </div>
    </div>
  `,
  styles: ``,
})
export default class HomeComponent {
  private readonly animeApiService = inject(AnimeApiService);
  readonly animeGenres = rxResource({
    loader: () => this.animeApiService.getAnimeGenres(),
  });
  readonly animeDisplay = rxResource({
    request: () => ({ id: this.searchGenreId() }),
    loader: ({ request }) =>
      request.id === 0 ? this.animeApiService.getTopAiringAnime() : this.animeApiService.searchAnime(request.id),
  });

  readonly searchGenreId = signal<number>(0);
}
