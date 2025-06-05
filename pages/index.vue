<template>
  <div ref="containerRef" :class="containerClass"
    class="flex flex-col items-center justify-center h-screen bg-[#0F0F0F] overflow-hidden">
    <!-- <img v-if="showImage" ref="logoRef" :class="`w-2/5 animate__animated ${animationClass}`"
      src="@/assets/image/IPESA-LOGO-White.png" alt="logo" @animationend="handleAnimationEnd" /> -->
    <div v-if="showImage" class="fixed inset-0 z-40">
      <!-- Fondo negro inicial -->
      <div class="absolute inset-0 bg-black transition-opacity duration-1000"
        :class="fadeOutBlack ? 'opacity-0' : 'opacity-100'">
      </div>

      <!-- Imagen de fondo -->
      <div
        class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 bg-[url('@/assets/image/intro.png')]"
        :class="{ 'opacity-100': showIntroImage, 'opacity-0': !showIntroImage }">
      </div>

      <!-- Logo -->
      <img ref="logoRef"
        :class="`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/5 animate__animated ${animationClass}`"
        src="@/assets/image/IPESA-LOGO-White.png" alt="logo" @animationend="handleAnimationEnd" />
    </div>
    <div v-else
      class="text-center bg-[url('@/assets/image/intro.png')] animate__animated animate__fadeIn flex items-center justify-center flex-col lg:flex-row w-full">
      <div class="h-screen flex flex-col w-full relative">
        <!-- Cuadro superior (izquierda) -->
        <div
          class="h-[45%] w-[80%] lg:w-[50%] lg:h-[30%] bg-[#F8CB32] self-start flex justify-end items-end px-4 animate__animated animate__fadeInDown">
          <p ref="productLineRef" class="text-black font-semibold text-lg text-start mb-4 flex lg:hidden"
            :class="productLineClass" @animationend="handleProductLineAnimationEnd">
            Línea de Productos
          </p>
        </div>

        <!-- Logo centrado -->
        <div class="h-[10%] lg:h-[40%] flex items-center justify-center w-full">
          <img src="@/assets/image/IPESA-LOGO-White.png" alt="logo" class="w-36 lg:hidden flex" />
          <div class="lg:flex justify-center items-stretch w-1/2 h-full hidden">
            <!-- Contenedor para el texto alineado abajo -->
            <div class="flex justify-end items-end w-1/2 p-6 animate__animated animate__fadeInLeftBig">
              <p class="text-white font-semibold text-lg text-end mb-10" :class="productLineClass"
                @animationend="handleProductLineAnimationEnd">Línea de Productos
              </p>
            </div>

            <!-- Contenedor para el logo y el texto -->
            <div class="flex flex-col  w-1/2 p-6 animate__animated animate__fadeInRightBig">
              <img src="@/assets/image/IPESA-LOGO-White.png" alt="logo" class="w-64 mt-10" />
              <h2 class="text-white font-bold mt-4 text-start text-lg">
                Construcción y <br>Utilitarios
              </h2>
            </div>
          </div>
        </div>

        <!-- Cuadro inferior (derecha) -->
        <div
          class="h-[45%] w-[80%] lg:w-[50%] lg:h-[30%] bg-[#292929] self-end px-4 animate__animated animate__fadeInUp">
          <h2 class="text-white font-bold mt-4 text-start text-lg flex lg:hidden">
            Construcción y <br>Utilitarios
          </h2>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import 'animate.css';

const animationStep = ref(0);
const showImage = ref(true);
const animationClass = ref('animate__zoomIn');
const productLineClass = ref('animate__animated animate__fadeInUp animate__delay-1s');
const productLineStep = ref(0);
const containerRef = ref<HTMLElement | null>(null);
const containerClass = ref('animate__animated'); // Clase inicial del contenedor
const fadeOutBlack = ref(false)
const showIntroImage = ref(false)

function handleAnimationEnd() {
  if (animationStep.value === 0) {
    animationClass.value = 'animate__flash';
    animationStep.value++;
  } else if (animationStep.value === 1) {
    animationClass.value = 'animate__fadeOutRight';
    animationStep.value++;
  } else if (animationStep.value === 2) {
    showImage.value = false;
  }
}

onMounted(() => {
  // Empieza fade del negro
  setTimeout(() => {
    fadeOutBlack.value = true

    // Luego de terminar el fade del negro, mostrar imagen
    setTimeout(() => {
      showIntroImage.value = true
    }, 500) // duración del fade-out negro
  }, 200) // leve retraso inicial para que se vea negro
})

function handleProductLineAnimationEnd() {
  if (productLineStep.value === 0) {
    productLineClass.value = 'animate__animated animate__flash';
    productLineStep.value++;
  } else if (productLineStep.value === 1) {
    // ✅ Aquí ocurre la animación final del contenedor
    containerClass.value += ' animate__fadeOut';

    // Escucha cuando termine para redirigir
    containerRef.value?.addEventListener(
      'animationend',
      () => {
        setTimeout(() => {
          navigateTo('/home');
        }, 300); // Espera 300ms luego de la animación
      },
      { once: true }
    );

    productLineStep.value++;
  }
}

</script>

<style scoped></style>
