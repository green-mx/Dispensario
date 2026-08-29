<template>
  <v-footer class="app-footer" padless>
    <v-container>
      <v-row>
        <!-- Logo -->
        <v-col cols="12" md="4" class="d-flex flex-column align-center">
          <v-img id="footer-logo" :src="footerImage" alt="Green Abastecedora Logo" />
          <p class="tagline text-center mt-2">Cannabis Experts · No Bad Trips</p>
        </v-col>

        <!-- Horario e info -->
        <v-col cols="12" md="4" class="text-center">
          <h3 class="footer-heading">Contáctanos</h3>
          <p>Horario: 11:00 AM – 8:00 PM todos los días</p>
          <p>Solo atendemos por <strong>WhatsApp</strong></p>
          <p>
            <a :href="`https://wa.me/524643446131`" target="_blank" class="whatsapp-link">
              <FontAwesomeIcon icon="fa-brands fa-whatsapp" /> +52 464 344 6131
            </a>
          </p>
        </v-col>

        <!-- Redes sociales -->
        <v-col cols="12" md="4" class="text-center">
          <h3 class="footer-heading">Síguenos</h3>
          <v-row justify="center">
            <v-btn icon variant="text">
              <a href="https://www.facebook.com/profile.php?id=61589347051660&locale=es_LA" target="_blank">
                <FontAwesomeIcon icon="fa-brands fa-facebook" size="lg" />
              </a>
            </v-btn>
            <v-btn icon variant="text">
              <FontAwesomeIcon icon="fa-brands fa-instagram" size="lg" />
            </v-btn>
          </v-row>
        </v-col>
      </v-row>

      <v-divider class="my-3 border-opacity-25" />

      <v-row>
        <v-col class="text-center">
          <small class="text-grey">
            &copy; 2016 Green Abastecedora · Solo para mayores de 18 años · Todos los derechos reservados
          </small>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
import footerImage from '@/components/icons/footer.png';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<style scoped>
.app-footer {
  background-color: #111111;
  color: #cccccc;
  padding: 24px 0 12px;
}
#footer-logo {
  width: 160px;
  margin: 0 auto;
}
.tagline {
  font-size: 13px;
  color: #888;
  letter-spacing: 0.05em;
}
.footer-heading {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #fff;
  letter-spacing: 0.05em;
}
.whatsapp-link {
  color: #25d366;
  text-decoration: none;
}
.whatsapp-link:hover {
  color: #1ebe5d;
}
.v-btn {
  color: #aaa;
  margin: 2px;
}
.v-btn:hover {
  color: #fff;
}
</style>