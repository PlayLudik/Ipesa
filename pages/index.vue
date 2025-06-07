<template>
  <div ref="containerRef" :class="containerClass"
    class="flex flex-col items-center justify-center h-screen bg-[#0F0F0F] overflow-hidden">
    <div
      class="text-center bg-[url('@/assets/image/Intro.webp')] animate__animated animate__fadeIn flex items-center justify-center flex-col lg:flex-row w-full">
      <div class="h-screen flex flex-col w-full relative">
        <!-- Cuadro superior (izquierda) -->
        <div v-if="!showImage"
          class="h-[40%] w-[80%] lg:w-[50%] lg:h-[30%] bg-[#F8CB32] self-start flex justify-end items-end px-4 animate__animated animate__fadeInDown">
          <p ref="animatedProductLineMobile" class="text-black font-semibold text-lg text-start mb-4 flex lg:hidden"
            :class="productLineClass">
            Línea de Productos
          </p>
        </div>
        <div class="absolute inset-0 bg-black transition-opacity duration-1000"
          :class="fadeOutBlack ? 'opacity-0' : 'opacity-100'">
        </div>
        <!-- Logo centrado -->
        <div class="h-[20%] lg:h-[40%] flex items-center justify-center">
          <img @animationend="handleLogoAnimationEnd" src="@/assets/image/IPESA-LOGO-White.png" alt="logo"
            class="w-64 animacion-imagen" />
        </div>
        <div v-if="!showImage" class="flex w-full lg:h-[30%] h-[40%]">
          <div class="flex-1 flex justify-end p-2 px-4">
            <p ref="animatedProductLineDesktop"
              class="text-white font-medium mt-4 text-end text-3xl hidden lg:flex italic animate__animated animate__fadeInRight animate__delay-0_2s">
              Linea de Productos</p>
          </div>
          <!-- Cuadro inferior (derecha) -->
          <div class="h-full w-[80%] lg:w-[50%] bg-[#292929] self-end px-4">
            <h2 class="text-white font-bold mt-4 text-start text-lg flex lg:hidden">
              Construcción y <br>Utilitarios
            </h2>
            <h2
              class="text-white font-bold mt-4 text-start text-3xl hidden lg:flex animate__animated animate__fadeInDown">
              Construcción y <br>Utilitarios
            </h2>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import 'animate.css';

const showImage = ref(true);
const productLineClass = ref('animate__animated animate__fadeInUp animate__delay-1s');
const containerRef = ref<HTMLElement | null>(null);
const containerClass = ref('animate__animated'); // Clase inicial del contenedor
const fadeOutBlack = ref(false);
const showIntroImage = ref(false);
const animatedProductLineMobile = ref<HTMLElement | null>(null);
const animatedProductLineDesktop = ref<HTMLElement | null>(null);

function handleLogoAnimationEnd() {
  // Oculta el logo
  showImage.value = false;

  // Espera que el DOM se actualice y se rendericen los <p>
  nextTick(() => {
    const prefersMobile = window.innerWidth < 768;

    const targetRef = prefersMobile
      ? animatedProductLineMobile.value
      : animatedProductLineDesktop.value;

    // Solo si el elemento existe, añadimos el listener
    if (targetRef) {
      targetRef.addEventListener(
        'animationend',
        () => {
          setTimeout(() => {
            navigateTo('/home');
          }, 300); // Pequeño delay opcional para transición fluida
        },
        { once: true }
      );
    }
  });
}

onMounted(() => {
  // Fade-out de fondo negro inicial
  setTimeout(() => {
    fadeOutBlack.value = true;

    // Luego muestra la imagen de fondo
    setTimeout(() => {
      showIntroImage.value = true;
    }, 300);
  }, 200);
});
</script>

<style scoped>
.animate__delay-0_2s {
  animation-delay: 0.2s;
}

.animate__delay-0_4s {
  animation-delay: 0.4s;
}

.animacion-imagen {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Desktop: animación en L */
@media (min-width: 768px) {
  .animacion-imagen {
    animation: moverEnL 2s ease-in-out forwards;
  }

  @keyframes moverEnL {
    0% {
      top: 50%;
      left: 25%;
      transform: translate(-50%, -50%);
      opacity: 1;
    }

    50% {
      top: 50%;
      left: 65%;
      transform: translate(-50%, -50%);
      opacity: 1;
    }

    100% {
      top: 45%;
      left: 65%;
      transform: translate(-50%, -50%);
      opacity: 1;
    }
  }
}

/* Mobile: reducción de tamaño centrada */
@media (max-width: 767px) {
  .animacion-imagen {
    animation: reducirImagen 2s ease-in-out forwards;
  }

  @keyframes reducirImagen {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }

    100% {
      transform: translate(-50%, -50%) scale(0.5);
      opacity: 1;
    }
  }
}
</style>
