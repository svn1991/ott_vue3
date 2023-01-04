export interface ShowResponseConfig {
  averageRuntime: number;
  genres: Array<string>;
  id: number;
  image: {
    medium: string;
  };
  language: string;
  name: string;
  rating: {
    average: number;
  };
  weight: number;
  summary: string;
}

export interface ShowConfig {
  averageRuntime: number;
  genres: Array<string>;
  id: number;
  image: string;
  language: string;
  name: string;
  rating: number;
  weight: number;
  summary: string;
}

export interface StoreGenreConfig {
  [key: string]: Array<number>;
}
export interface StoreShowsConfig {
  [key: number]: ShowConfig;
}
