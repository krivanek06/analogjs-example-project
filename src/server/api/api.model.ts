export type AnimeGenres = {
  mal_id: number;
  name: string;
  url: string;
  count: number;
};

export type AnimeDataAPI<T> = {
  data: T[];
};

export type AnimeDetails = {
  mal_id: number;
  url: string;
  title: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  trailer: {
    youtube_id: string | null;
    url: string | null;
    embed_url: string | null;
    images: {
      image_url: string | null;
      small_image_url: string | null;
      medium_image_url: string | null;
      large_image_url: string | null;
      maximum_image_url: string | null;
    };
  };
  approved: boolean;
  titles: {
    type: string;
    title: string;
  }[];
  title_english?: string | null;
  title_japanese: string;
  title_synonyms: any[];
  type: string;
  source: string;
  episodes: number | null;
  status: string;
  airing: boolean;
  aired: {
    from: string;
    to: string | null;
    prop: {
      from: {
        day: number;
        month: number;
        year: number;
      };
      to: { day: number | null; month: number | null; year: number | null };
    };
    string: string;
  };
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: {
    day: string;
    time: string;
    timezone: string;
    string: string;
  };
  producers: { mal_id: number; type: string; name: string; url: string }[];
  licensors: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];
  studios: { mal_id: number; type: string; name: string; url: string }[];
  genres: { mal_id: number; type: string; name: string; url: string }[];
  explicit_genres: any[];
  themes: { mal_id: number; type: string; name: string; url: string }[];
  demographics: any[];
};
