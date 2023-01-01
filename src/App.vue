<script setup lang="ts">
// import { RouterLink, RouterView } from "vue-router";

import HeaderBar from "./views/HeaderBar.vue";
import FooterBar from "./views/FooterBar.vue";
</script>

<template>
  <div class="container">
    <header class="border-b-2 border-yellow-300">
      <HeaderBar />
    </header>
    <section class="wrapper">
      <RouterView />
      <!-- <nav>
          <RouterLink to="/"></RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav> -->
    </section>
    <footer><FooterBar /></footer>
  </div>
</template>

<style scoped></style>
