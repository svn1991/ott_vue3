<script lang="ts">
import { defineComponent } from "vue";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import ShowCard from "./ShowCard.vue";
import type { ShowConfig } from "@/instances";

export default defineComponent({
  name: "ShowCarousel",
  props: {
    shows: Array<ShowConfig>,
  },
  components: {
    Carousel,
    Slide,
    Navigation,
    ShowCard,
  },
  data: () => ({
    // carousel settings
    settings: {
      itemsToShow: 1,
      snapAlign: "center",
    },
  }),
});
</script>

<template>
  <Carousel
    :itemsToShow="6.95"
    :wrapAround="false"
    :itemsToScroll="5"
    :transition="500"
  >
    <Slide v-for="show in shows" :key="show.id">
      <div class="carousel__item">
        <ShowCard :show="show"></ShowCard>
      </div>
    </Slide>
    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<style>
.carousel__slide {
  justify-content: flex-start;
}

.carousel__item {
}

.carousel__viewport {
  perspective: 2000px;
  overflow: visible;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__prev,
.carousel__next {
  color: white;
  height: 100%;
  width: 75px;
  background-color: #7e7e7eb8 !important;
  font-size: xxx-large;
  position: absolute;
}

.carousel__prev {
  left: -50px;
}

.carousel__next {
  right: -50px;
}
</style>
