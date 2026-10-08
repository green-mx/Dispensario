<template>
  <section class="g-wrap g-page-head" style="max-width:1000px">
    <div style="text-align:center;margin-bottom:40px">
      <h1 class="g-title" style="margin-top:0"><span class="g-gt">Green Abastecedora</span></h1>
      <p class="g-sub" style="letter-spacing:.15em">Cannabis Experts · No Bad Trips</p>
    </div>

    <div class="g-about">
      <div class="g-box g-glass" v-reveal>
        <h2>Horario de Servicio</h2>
        <p>Abierto todos los días de <strong>11:00 AM a 8:00 PM</strong></p>
        <p class="g-m">Solo atendemos a través de WhatsApp. No aceptamos llamadas.</p>
      </div>

      <div class="g-box g-glass" v-reveal>
        <h2>Formas de Pago</h2>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">
          <span v-for="m in ['SPEI', 'Efectivo', 'OXXO']" :key="m" class="g-chip" style="color:#eaf3ea;background:#ffffff12;border-color:#ffffff2a;padding:7px 14px;font-size:12px">{{ m }}</span>
        </div>
        <p class="g-m">En caso de transferencia, debe estar confirmada antes de preparar el pedido.</p>
      </div>

      <div class="g-box g-glass" v-reveal>
        <h2>Política de Cambios</h2>
        <ul>
          <li>Plazo máximo de 24 horas para notificar errores en tu producto.</li>
          <li>Solo en caso de defecto de fábrica o producto en mal estado.</li>
          <li>El producto debe estar en empaque original sin abrir.</li>
          <li>Todas nuestras oz contienen 28 gramos.</li>
        </ul>
      </div>

      <div class="g-box g-glass" v-reveal>
        <h2>Entregas</h2>
        <ul>
          <li>Nuestro equipo puede esperarte máximo 10 minutos.</li>
          <li>No entregamos dentro de plazas comerciales ni restaurantes.</li>
          <li>Si no contamos con cobertura en tu zona, te pedimos acudir a punto medio.</li>
        </ul>
      </div>
    </div>
  </section>
</template>
