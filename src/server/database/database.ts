import { AnimeDetails } from '../api/api.model';

/**
 * example of a database connection
 */
export class Database {
  static instance = new Database();
  storedData: {
    [K in string]: {
      likedAnime: AnimeDetails[];
    };
  } = {};

  constructor() {
    this.storedData = {
      testname: { likedAnime: [] },
    };
  }

  async createUser(username: string) {
    this.storedData = {
      ...this.storedData,
      [username]: { likedAnime: [] },
    };
  }

  async getUsers() {
    return this.storedData;
  }

  async getUser(username: string) {
    const user = this.storedData[username];
    if (!user) {
      return null;
    }
    return user;
  }

  async addLikedAnime(username: string, anime: AnimeDetails) {
    const user = this.storedData[username];
    if (!user || user.likedAnime.map(d => d.mal_id).includes(anime.mal_id)) {
      return false;
    }
    user.likedAnime.push(anime);
    return true;
  }

  async removeLikedAnime(username: string, animeId: number) {
    const user = this.storedData[username];
    if (!user) {
      return false;
    }

    user.likedAnime = user.likedAnime.filter(anime => anime.mal_id !== animeId);
    return true;
  }

  async getLikedAnime(username: string) {
    return this.storedData[username]?.likedAnime || [];
  }
}
