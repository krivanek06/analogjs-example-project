import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AnimeDetails } from './../../services/api.model';

@Component({
  selector: 'app-anime-card',
  imports: [MatButtonModule],
  template: `
    <div
      class="rounded-xl shadow-lg bg-gray-600 hover:scale-105 transition-transform duration-300 cursor-pointer relative h-full">
      <!-- image -->
      <img [src]="animeDetails().images.webp.image_url" class="w-full h-full object-cover" />

      <!-- title -->
      <div class="absolute bg-black opacity-85 text-white p-4 bottom-0 w-full text-center">
        {{ animeDetails().title_english ?? animeDetails().title }}
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeCardComponent {
  readonly animeDetails = input.required<AnimeDetails>();
}
