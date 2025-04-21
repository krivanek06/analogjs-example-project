import { computed, effect, Injectable, signal } from '@angular/core';
import { AnimeDetails } from './../../server/api/api.model';

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
  private readonly _likedAnime = signal<AnimeDetails[]>([]);

  readonly store = computed(() => {
    const user = this._authUser();
    const likedAnime = this._likedAnime();

    return {
      user,
      likedAnime,
    };
  });

  readonly authUser = computed(() => this._authUser());
  readonly likedAnime = computed(() => this._likedAnime());

  readonly storeEffect = effect(() => console.log('store', this.store()));

  setAuthUser(user: AuthUser | null) {
    this._authUser.set(user);
  }

  addLikedAnime(anime: AnimeDetails) {
    this._likedAnime.set([...this._likedAnime(), anime]);
  }

  removeLikedAnime(animeId: number) {
    this._likedAnime.set(this._likedAnime().filter(anime => anime.mal_id !== animeId));
  }
}
