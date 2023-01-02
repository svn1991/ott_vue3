<script setup lang="ts">
import type { ShowConfig } from "@/instances";
const props = defineProps<{
  show: ShowConfig;
}>();
</script>

<template>
  <span>
    <div><img :src="props.show.image" alt="props.show.name" /></div>
    <div>{{ props.show.name }}</div>
  </span>
</template>
