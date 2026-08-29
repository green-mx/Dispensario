<template>
  <div class="hero-section">
    <v-parallax :src="heroImage" content class="hero-banner">
      <div class="hero-overlay d-flex flex-column align-center justify-center">
        <p class="hero-subtitle">Cannabis Experts · No Bad Trips</p>
        <v-chip class="mt-2" color="green-darken-3" variant="tonal">Solo +18</v-chip>
      </div>
    </v-parallax>
  </div>
</template>

<script setup>
import heroImage from './../icons/dp-green.jpg';

</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
}
.hero-banner {
  width: 100%;
  height: 380px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}
.hero-overlay {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.55);
  text-align: center;
}
.hero-title {
  font-size: clamp(1.6rem, 5vw, 3rem);
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #fff;
  text-shadow: 0 2px 12px rgba(0,0,0,0.7);
}
.hero-subtitle {
  font-size: 1rem;
  color: #ccc;
  letter-spacing: 0.2em;
  margin-top: 6px;
}
</style>