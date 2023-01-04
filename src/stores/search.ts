import { reactive } from "vue";
import { defineStore } from "pinia";

import { searchShows } from "./helpers/apiCalls";

import type { ShowConfig } from "@/instances";

interface ShowStoreConfig {
  error: string;
  searchResults: ShowConfig[];
  searchQuery: string;
}

export const searchStore = defineStore("search", () => {
  const searchInfo: ShowStoreConfig = reactive({
    error: "",
    searchResults: [],
    searchQuery: "",
  });

  const getSearchResults = async (query: string) => {
    // if query is same string, dont trigger an api call
    if (query !== searchInfo.searchQuery) {
      searchInfo.searchQuery = query;
      const { searchResults, error } = await searchShows(query);
      searchInfo.searchResults = searchResults;
      searchInfo.error = error;
      console.log(searchResults, error);
    }
  };

  const resetSearch = () => {
    searchInfo.searchQuery = "";
    searchInfo.searchResults = [];
    searchInfo.error = "";
  };

  return { searchInfo, getSearchResults, resetSearch };
});
