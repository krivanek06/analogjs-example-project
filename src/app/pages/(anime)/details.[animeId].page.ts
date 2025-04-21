import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { AnimeApiService } from './../../services/anime-api.service';

@Component({
  selector: 'app-anime-details.page.ts',
  imports: [RouterLink, MatButtonModule],
  template: `
    @if (animeDetails.value(); as animeDetails) {
      <div class="max-w-[1080px] mx-auto pt-16">
        <div class="flex flex-col lg:flex-row gap-6 max-w-[1440px] mx-auto">
          <!-- image -->
          <img
            [src]="animeDetails.images.webp.image_url"
            class="rounded-xl shadow-lg w-full lg:w-1/2 max-h-[500px] object-contain" />

          <div class="flex flex-col gap-4 w-full lg:w-1/2">
            <!-- title -->
            <h1 class="text-3xl font-bold text-white">{{ animeDetails.title_english ?? animeDetails.title }}</h1>

            <!-- description -->
            <p class="text-gray-300 text-sm">{{ animeDetails.synopsis }}</p>

            <!-- genres -->
            <div class="flex flex-wrap gap-2">
              @for (item of animeDetails.genres; track item.mal_id) {
                <span class="bg-gray-700 text-gray-300 rounded-full px-3 py-1 text-sm">{{ item.name }}</span>
              }
            </div>

            <!-- back button -->
            <div class="pt-4">
              <button mat-flat-button routerLink="/" type="button">Back to Home</button>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AnimeDetailsPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly animeApiService = inject(AnimeApiService);

  readonly animeDetails = rxResource({
    loader: () =>
      this.route.paramMap.pipe(
        map(params => params.get('animeId')),
        filter((animeId): animeId is string => !!animeId),
        switchMap(animeId => this.animeApiService.getAnimeById(animeId))
      ),
  });
}
