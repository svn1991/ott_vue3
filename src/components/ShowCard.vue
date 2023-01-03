<script setup lang="ts">
import { showsStore } from "@/stores/shows";
import type { ShowConfig } from "@/instances";

const store = showsStore();
const { updateShowClicked } = store;

const props = defineProps<{
  show: ShowConfig;
}>();

const openModal = () => {
  document.body.style.overflowY = "hidden";
  updateShowClicked(props.show);
};
</script>

<template>
  <span @click="openModal" class="cursor-pointer">
    <div>
      <img
        class="h-52 object-cover"
        :src="props.show.image"
        alt="props.show.name"
      />
    </div>
  </span>
</template>
