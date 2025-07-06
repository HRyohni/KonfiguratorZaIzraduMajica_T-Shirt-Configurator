<template>
  <v-app>
    <v-main>
      <div class="d-flex justify-center">
        <v-img class="ma-5"   height="100" src="logo.png"></v-img>
      </div>

      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import TshirtConfigurator from './components/TshirtConfigurator.vue';
</script>