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
  <div v-else-if="showsInfo.shows.length === 0">Loading...</div>
  <div v-else>
    <div>
      <ShowCarousel :shows="showsInfo.shows" />
    </div>
  </div>
</template>
