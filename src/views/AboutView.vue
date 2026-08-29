<template>
  <v-container class="about-page">
    <v-row class="mb-6">
      <v-col cols="12" class="text-center">
        <h1 class="about-title">Green Abastecedora</h1>
        <p class="about-sub">Cannabis Experts · No Bad Trips</p>
      </v-col>
    </v-row>

    <v-row class="mb-6" justify="center">
      <v-col cols="12" md="8">
        <v-card class="info-card pa-6">
          <h2 class="info-heading">Horario de Servicio</h2>
          <p>Abierto todos los días de <strong>11:00 AM a 8:00 PM</strong></p>
          <p class="mt-2 text-grey">Solo atendemos a través de WhatsApp. No aceptamos llamadas.</p>

          <v-divider class="my-4" />

          <h2 class="info-heading">Formas de Pago</h2>
          <div class="payment-methods">
            <v-chip>SPEI</v-chip>
            <v-chip>Efectivo</v-chip>
            <v-chip>OXXO</v-chip>
          </div>
          <p class="mt-3 text-caption text-grey">
            En caso de transferencia, debe estar confirmada antes de preparar el pedido.
          </p>

          <v-divider class="my-4" />

          <h2 class="info-heading">Política de Cambios</h2>
          <ul class="policy-list">
            <li>Plazo máximo de 24 horas para notificar errores en tu producto.</li>
            <li>Solo en caso de defecto de fábrica o producto en mal estado.</li>
            <li>El producto debe estar en empaque original sin abrir.</li>
            <li>Todas nuestras oz contienen 28 gramos.</li>
          </ul>

          <v-divider class="my-4" />

          <h2 class="info-heading">Entregas</h2>
          <ul class="policy-list">
            <li>Nuestro equipo puede esperarte máximo 10 minutos.</li>
            <li>No entregamos dentro de plazas comerciales ni restaurantes.</li>
            <li>Si no contamos con cobertura en tu zona, te pedimos acudir a punto medio.</li>
          </ul>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <AppFooter />
</template>

<script setup>
import AppFooter from '@/components/layout/AppFooter.vue';
</script>

<style scoped>
.about-page { max-width: 1000px; margin: 0 auto; padding-top: 24px; }
.about-title {
  font-size: 2.5rem;
  font-weight: 800;
  font-family: 'Poppins', sans-serif;
  color: #4caf50;
  letter-spacing: 0.1em;
}
.about-sub { color: #888; letter-spacing: 0.15em; }
.info-card { background: #1a1a1a; border-radius: 16px; }
.info-heading {
  font-size: 1.1rem;
  font-weight: 700;
  color: #4caf50;
  margin-bottom: 8px;
  letter-spacing: 0.05em;
}
.payment-methods { display: flex; gap: 10px; flex-wrap: wrap; }
.policy-list {
  color: #bbb;
  font-size: 0.9rem;
  line-height: 1.8;
  padding-left: 20px;
}
</style>