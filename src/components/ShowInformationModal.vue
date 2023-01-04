<script setup lang="ts">
import { showsStore } from "@/stores/shows";
import type { ShowConfig } from "@/instances";

const store = showsStore();
const { updateShowClicked } = store;

const props = defineProps<{
  show: ShowConfig;
}>();

const closeModal = () => {
  updateShowClicked(null);
  document.body.style.overflowY = "unset";
};

// const closeShowInformation = "closeShowInformation";
// const emits = defineEmits<{
//   (e: typeof closeShowInformation, id: string): void;
// }>();
</script>

<template>
  <div>
    <div
      class="h-full w-full fixed top-0 left-0 z-20 bg-gray-700 bg-opacity-75"
      @click="closeModal"
    ></div>
    <div
      class="bg-white rounded-lg text-lg pt-6 shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 overflow-y-auto"
      :class="['modal-popup']"
    >
      <h2 class="text-2xl pb-5 font-bold text-teal-400 px-6">
        {{ props.show.name }}
      </h2>
      <div class="px-6 pb-6 flex">
        <div class="float-left w-3/12 min-w-[150px]">
          <img
            v-if="props.show.image"
            class="h-52 object-cover"
            :src="props.show.image"
            alt="props.show.name"
          />
          <div v-else class="h-52 bg-teal-400 flex justify-center items-center">
            <img class="h-10 w-10" src="@/assets/images/broadcast.png" />
          </div>
        </div>
        <div class="float-left pl-1 w-9/12 text-base text-gray-500">
          <div>
            <span v-html="props.show.summary" />
          </div>
          <div class="pt-3">
            <div class="p-1">Runtime: {{ props.show.averageRuntime }} mins</div>
            <div class="p-1">Rating: {{ props.show.rating }}/10</div>
            <div class="p-1">Genres: {{ props.show.genres.join(", ") }}</div>
          </div>
        </div>
      </div>
      <div class="px-6 py-3 rounded-b-lg flex justify-center">
        <button
          class="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded"
          @click="closeModal"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-popup {
  max-height: 60vh;
}
</style>
