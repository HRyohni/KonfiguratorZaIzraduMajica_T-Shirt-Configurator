<template>
  <v-container class="fill-height text-center">
    <v-row align="center" justify="center">
      <v-col>
        <v-icon size="100" color="success" class="mb-4">mdi-check-circle-outline</v-icon>
        <h1 class="text-h4 mb-2">Narudžba je uspješno zaprimljena!</h1>
        <p class="text-body-1">
          Hvala vam na povjerenju. Javit ćemo vam se u najkraćem mogućem roku na uneseni email ili broj telefona s detaljima narudžbe i ponudom.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// Nema posebne logike za ovu stranicu
</script>

<style scoped>
.fill-height {
  min-height: 80vh;
}
</style>