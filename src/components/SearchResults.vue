<script setup lang="ts">
import { storeToRefs } from "pinia";
import { showsStore } from "@/stores/shows";
import { searchStore } from "@/stores/search";
import type { ShowConfig } from "@/instances";

const searchStoreObj = searchStore();
const { searchInfo } = storeToRefs(searchStoreObj);
const { toggleSearch } = searchStoreObj;

const showsStoreObj = showsStore();
const { updateShowClicked } = showsStoreObj;

const openModal = (show: ShowConfig) => {
  document.body.style.overflowY = "hidden";
  updateShowClicked(show);
  toggleSearch();
};
</script>
<template>
  <div
    v-if="searchInfo.searchResults.length > 0 && searchInfo.showResults"
    class="absolute top-6 w-60 mx-2 pt-4 pb-1 bg-white z-40 rounded-md"
  >
    <div class="h-full w-full fixed top-0 left-0" @click="toggleSearch"></div>
    <ul class="max-h-72 overflow-hidden overflow-y-auto relative">
      <li
        class="flex p-2 border-b-2 border-teal-400 cursor-pointer hover:bg-teal-300"
        v-for="result of searchInfo.searchResults"
        :key="result.id"
        @click="openModal(result)"
      >
        <div class="w-10">
          <img v-if="result.image" :src="result.image" />
          <div v-else class="h-14 bg-teal-400 flex justify-center items-center">
            <img class="h-8 w-8" src="@/assets/images/broadcast.png" />
          </div>
        </div>
        <div class="flex items-center pl-4 text-sm">{{ result.name }}</div>
      </li>
      <li class="text-center py-2">
        <button
          class="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded"
          @click="$emit('clearResults')"
        >
          Close
        </button>
      </li>
    </ul>
  </div>
</template>
