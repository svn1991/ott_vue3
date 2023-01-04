import { reactive } from "vue";
import { defineStore } from "pinia";

import { searchShows } from "./helpers/apiCalls";

import type { ShowConfig } from "@/instances";

interface ShowStoreConfig {
  error: string;
  searchResults: ShowConfig[];
  searchQuery: string;
  showResults: boolean;
}

export const searchStore = defineStore("search", () => {
  const searchInfo: ShowStoreConfig = reactive({
    error: "",
    searchResults: [],
    searchQuery: "",
    showResults: false,
  });

  const getSearchResults = async (query: string) => {
    // if query is same string, dont trigger an api call
    if (query !== searchInfo.searchQuery) {
      searchInfo.searchQuery = query;
      const { searchResults, error } = await searchShows(query);
      searchInfo.searchResults = searchResults;
      searchInfo.error = error;
    }
    searchInfo.showResults = !searchInfo.error;
  };

  const resetSearch = () => {
    searchInfo.searchQuery = "";
    searchInfo.searchResults = [];
    searchInfo.error = "";
    searchInfo.showResults = false;
  };

  const toggleSearch = () => {
    searchInfo.showResults = !searchInfo.showResults;
  }

  return { searchInfo, getSearchResults, resetSearch, toggleSearch };
});
