import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, of } from 'rxjs';
import { AnimeDataAPI, AnimeDetails } from '../../server/api/api.model';
import { mockAnimeGenres, mockPopularAnime } from './mock.data';

@Injectable({
  providedIn: 'root',
})
export class AnimeApiService {
  // api docs: https://docs.api.jikan.moe
  private readonly API = 'https://api.jikan.moe/v4';
  private readonly http = inject(HttpClient);

  saveAnime(id: number | string, username: string) {
    return this.http.post<{ data: AnimeDetails }>('/api/anime/save-anime', {
      id,
      username,
    });
  }

  removeAnime(id: number | string, username: string) {
    return this.http.post<{ data: AnimeDetails }>('/api/anime/remove-anime', {
      id,
      username,
    });
  }

  getAnimeById(id: number | string) {
    return this.http.get<{ data: AnimeDetails }>(`${this.API}/anime/${id}`).pipe(map(res => res.data));
  }

  getTopAiringAnime(limit = 10) {
    return of(mockPopularAnime);
  }

  getAnimeGenres() {
    return of(mockAnimeGenres);
  }

  /**
   * search anime based on prefix
   *
   * @param prefix prefix of the anime we are searching
   * @param genresId genres id of the anime
   * @returns searched anime that has 'score' property
   */
  searchAnime(genresId = 1) {
    return this.http.get<AnimeDataAPI<AnimeDetails>>(`${this.API}/anime?genres=${genresId}&limit=15`).pipe(
      map(res => res.data.filter(d => !!d.score)),
      delay(1000)
    );
  }
}
