<script setup lang="ts">
import { ref } from "vue";
import { searchStore } from "@/stores/search";
import SearchIcon from "@/assets/icons/SearchIcon.vue";
import SearchResults from "@/components/SearchResults.vue";

const store = searchStore();
const { getSearchResults, resetSearch } = store;
const searchQuery = ref("");

const closeResultTab = () => {
  searchQuery.value = "";
  resetSearch();
};

const inputClicked = () => {
  if (searchQuery.value) {
    getSearchResults(searchQuery.value);
  }
};
</script>
<template class="bg-color-red">
  <div class="relative">
    <input
      class="bg-gray-50 border-4 border-teal-200 text-gray-900 text-sm rounded-lg block w-64 p-2 px-2 pr-7 pt-1 mr-2.5 focus:ring-teal-400 focus:border-teal-400 relative z-50"
      type="text"
      v-model="searchQuery"
      @keyup.enter="getSearchResults(searchQuery)"
      @click="inputClicked"
    />
    <SearchIcon
      @click="getSearchResults(searchQuery)"
      class="h-6 w-6 absolute right-4 top-1.5 z-50"
    />
    <SearchResults @clearResults="closeResultTab" />
  </div>
</template>
