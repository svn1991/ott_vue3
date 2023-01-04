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
        v-if="props.show.image"
        class="h-52 object-cover border-yellow-400 border-2 hover:border-4 rounded-md hover:rounded-lg"
        :src="props.show.image"
        alt="props.show.name"
      />
      <div
        v-else
        class="h-52 w-36 bg-teal-400 border-yellow-400 border-2 hover:border-4 rounded-md hover:rounded-lg"
      >
        <div class="h-3/4 flex justify-center items-center">
          <img
            class="object-cover h-20 w-20"
            src="@/assets/images/broadcast.png"
            alt="default tv cover"
          />
        </div>
        <div class="h-1/4 text-sm text-gray-500 font-bold break-words px-2">
          {{
            props.show.name.length > 30
              ? `${props.show.name.substring(0, 30)}...`
              : props.show.name
          }}
        </div>
      </div>
    </div>
  </span>
</template>
