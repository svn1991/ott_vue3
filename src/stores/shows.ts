import { reactive } from "vue";
import { defineStore } from "pinia";

import { getShows } from "./helpers/apiCalls";

import type {
  ShowConfig,
  StoreGenreConfig,
  StoreShowsConfig,
} from "@/instances";

interface ShowStoreConfig {
  shows: StoreShowsConfig;
  error: string;
  genres: StoreGenreConfig;
  showClicked: ShowConfig | null;
  searchResults: ShowConfig[];
  searchQuery: string;
}

export const showsStore = defineStore("shows", () => {
  const showsInfo: ShowStoreConfig = reactive({
    shows: {},
    genres: {},
    error: "",
    showClicked: null,
    searchResults: [],
    searchQuery: "",
  });

  const updateShowClicked = (show: ShowConfig | null = null) => {
    showsInfo.showClicked = show;
  };

  const getAllShows = async () => {
    const { shows, genres, error } = await getShows();
    showsInfo.shows = shows;
    showsInfo.genres = genres;
    showsInfo.error = error;
  };

  return { showsInfo, getAllShows, updateShowClicked };
});
