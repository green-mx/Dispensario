<template>
  <div id="app">
    <AppNavbar />
    <router-view />
    <PurchaseFormModal />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import AppNavbar from '@/components/layout/AppNavbar.vue';
import PurchaseFormModal from '@/components/shared/PurchaseFormModal.vue';
</script>

<style>
* { box-sizing: border-box; }
body {
  background-color: #111111;
  color: #eeeeee;
  margin: 0;
}
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
