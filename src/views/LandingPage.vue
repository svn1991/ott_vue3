<script setup lang="ts">
import { storeToRefs } from "pinia";
import { showsStore } from "@/stores/shows";
import ShowCarousel from "../components/ShowCarousel.vue";

const store = showsStore();
const { showsInfo } = storeToRefs(store);
const { getAllShows } = store;
getAllShows();
</script>
<template>
  <div v-if="showsInfo.error">Please contact adminstrator</div>
  <div v-else-if="Object.keys(showsInfo.shows).length === 0">Loading...</div>
  <div v-else>
    <div v-for="(showsId, genre) in showsInfo.genres" :key="genre" class="py-5">
      <h1 class="font-bold text-3xl pt-5 pb-5 text-white">{{ genre }}</h1>
      <div>
        <ShowCarousel :shows="showsId.map((id) => showsInfo.shows[id])" />
      </div>
    </div>
  </div>
</template>
