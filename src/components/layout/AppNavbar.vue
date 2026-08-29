<template>
  <div class="navbar-wrapper">
    <MegaMenu :model="items">
      <template #item="{ item }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" @click="navigate" class="nav-link">
            <FontAwesomeIcon v-if="item.icon" :icon="item.icon" class="mr-1" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" class="nav-link">
          <FontAwesomeIcon v-if="item.icon" :icon="item.icon" class="mr-1" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </template>
    </MegaMenu>
  </div>
</template>

<script setup>
import MegaMenu from 'primevue/megamenu';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const items = ref([
  {
    label: 'Dispensario Green MX',
    icon: 'fa-store',
    items: [
      [
        {
          label: 'Menú Principal',
          items: [
            { label: 'Inicio', icon: 'fa-house', command: () => router.push('/') },
            { label: 'Nosotros', icon: 'fa-circle-info', command: () => router.push('/about') }
          ]
        }
      ],
      [
        {
          label: 'Flores y Concentrados',
          items: [
            { label: 'Weed', icon: 'fa-leaf', command: () => router.push('/weed') },
            { label: 'Top Shelf', icon: 'fa-crown', command: () => router.push('/top-shelf') },
            { label: 'Pre-Rolados', icon: 'fa-joint', command: () => router.push('/pre-rolados') },
          ]
        }
      ], 
      [
        {
          label: 'otros',
          items: [
            { label: 'Carts', icon: 'fa-vial', command: () => router.push('/carts') },
            { label: 'Frascos', icon: 'fa-jar', command: () => router.push('/frascos') },
            { label: 'Hongos', icon: 'fa-cookie-bite', command: () => router.push('/hongos') },
          ]
        }
      ]
    ]
  }
]);
</script>

<style scoped>
.navbar-wrapper {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #111; /* Fondo base del menú principal */
  border-bottom: 1px solid #222;
}

/* 1. Limitar el ancho del panel desplegable para que no sea pantalla completa */
:deep(.p-megamenu-panel) {
  width: max-content !important; 
  min-width: 350px !important;
  border-radius: 8px !important;
  padding: 1rem !important;
  background: #1a1a1a !important;
  border: 1px solid #333 !important;
}

/* 2. Juntar las columnas en el centro sin huecos masivos */
:deep(.p-megamenu-grid) {
  display: flex !important;
  gap: 3rem !important; /* Espacio exacto entre "Menú Principal" y "Categorías" */
}

/* 3. Evitar que las columnas individuales crezcan a lo loco */
:deep(.p-megamenu-col-12),
:deep(.p-megamenu-col-6) {
  width: auto !important;
  flex: none !important;
}

/* 4. Estructura de los títulos de columna */
:deep(.p-megamenu-submenu-header) {
  background: transparent !important;
  padding: 0 0 0.5rem 0 !important;
  margin-bottom: 0.5rem !important;
  border-bottom: 1px solid #444;
  font-weight: bold;
}

/* 5. Acomodo limpio de los links (sin estirarse) */
.nav-link {
  display: flex;
  align-items: center;
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  text-decoration: none;
  color: #ddd;
  transition: background 0.2s;
  width: 100%; /* Toma el ancho de su columna compacta, no de la pantalla */
  box-sizing: border-box;
  user-select: none; /* Evita que se seleccione el texto al hacer clic */
}

.nav-link:hover {
  background: #2a2a2a; /* Un gris un pelín más claro al pasar el mouse */
}
</style>