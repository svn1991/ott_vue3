import axios from "axios";
import type {
  ShowConfig,
  ShowResponseConfig,
  StoreGenreConfig,
  StoreShowsConfig,
} from "@/instances";

const BASE_PATH: string = "https://api.tvmaze.com";
const SHOWS_PATH: string = `${BASE_PATH}/shows`;
const SEARCH_PATH: string = `${BASE_PATH}/search/shows`;

interface AllShowsReturnConfig {
  shows: StoreShowsConfig;
  error: string;
  genres: StoreGenreConfig;
}

interface SearchResultsConfig {
  searchResults: ShowConfig[];
  error: string;
}

interface SearchResponseConfig {
  show: ShowResponseConfig;
}

export const searchShows = async (
  query: string
): Promise<SearchResultsConfig> => {
  return await axios
    .get(`${SEARCH_PATH}?q=${query}`)
    .then((response) => {
      const data = response.data;
      const searchResults = data.map(({ show }: SearchResponseConfig) => {
        return {
          averageRuntime: show.averageRuntime,
          genres: show.genres,
          id: show.id,
          image: show.image?.medium,
          language: show.language,
          name: show.name,
          rating: show.rating.average,
          weight: show.weight,
          summary: show.summary,
        };
      });
      return { searchResults, error: "" };
    })
    .catch((error) => {
      return { searchResults: [], error };
    });
};

export const getShows = async (): Promise<AllShowsReturnConfig> => {
  return await axios
    .get(SHOWS_PATH)
    .then((response) => {
      const data = response.data;
      data.sort(
        (a: ShowResponseConfig, b: ShowResponseConfig) =>
          b.rating.average - a.rating.average
      );
      const genreShowMap: StoreGenreConfig = {};
      const showsInfoMap: StoreShowsConfig = {};
      const idsOrganized = new Set();
      data.forEach((show: ShowResponseConfig) => {
        for (const genre of show.genres) {
          if (!genreShowMap[genre]) genreShowMap[genre] = [];
          if (genreShowMap[genre].length > 25) continue;
          if (!idsOrganized.has(show.id)) {
            genreShowMap[genre].push(show.id);
            idsOrganized.add(show.id);
          }
        }
        showsInfoMap[show.id] = {
          averageRuntime: show.averageRuntime,
          genres: show.genres,
          id: show.id,
          image: show.image?.medium,
          language: show.language,
          name: show.name,
          rating: show.rating.average,
          weight: show.weight,
          summary: show.summary,
        };
      });

      for (const genre in genreShowMap) {
        if (genreShowMap[genre].length < 8) {
          delete genreShowMap[genre];
        }
      }

      return {
        shows: showsInfoMap,
        genres: genreShowMap,
        error: "",
      };
    })
    .catch((error) => {
      return {
        shows: {},
        genres: {},
        error,
      };
    });
};
