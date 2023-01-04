<script setup lang="ts">
// import { RouterLink, RouterView } from "vue-router";
import HeaderBar from "./views/HeaderBar.vue";
import FooterBar from "./views/FooterBar.vue";
import ShowInformationModal from "./components/ShowInformationModal.vue";

import { storeToRefs } from "pinia";
import { showsStore } from "@/stores/shows";

document.body.style.overflowX = "hidden";

const store = showsStore();
const { showsInfo } = storeToRefs(store);
</script>

<template>
  <div class="container">
    <header class="border-b-2 border-yellow-300">
      <HeaderBar />
    </header>
    <section class="wrapper px-10">
      <RouterView />
      <ShowInformationModal
        v-if="showsInfo.showClicked"
        :show="showsInfo.showClicked"
      />
      <!-- <nav>
          <RouterLink to="/"></RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav> -->
    </section>
    <footer class="border-t-2 border-yellow-300 mt-10"><FooterBar /></footer>
  </div>
</template>

<style scoped></style>
