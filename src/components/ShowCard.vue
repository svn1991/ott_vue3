<script setup lang="ts">
import type { ShowConfig } from "@/instances";
const props = defineProps<{
  show: ShowConfig;
}>();
</script>

<template>
  <span>
    <div>
      <img
        class="h-52 object-cover"
        :src="props.show.image"
        alt="props.show.name"
      />
    </div>
  </span>
</template>
