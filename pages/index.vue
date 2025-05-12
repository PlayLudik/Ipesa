<template>
  <div ref="containerRef" :class="containerClass"
    class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <img v-if="showImage" ref="logoRef" :class="`w-2/5 animate__animated ${animationClass}`"
      src="@/assets/image/IPESA-LOGO.png" alt="logo" @animationend="handleAnimationEnd" />

    <div v-else
      class="text-center animate__animated animate__fadeIn flex items-center justify-center flex-col lg:flex-row">
      <div class="grid lg:grid-cols-4 grid-cols-2 gap-4 lg:w-3/6 w-full">
        <div class="col-span-2 flex flex-col gap-4">
          <div class="bg-black h-[230px] w-[230px] lg:ml-11 mx-auto animate__animated animate__fadeInUp"></div>
          <div
            class="w-full animate__animated animate__bounceIn animate__delay-1s lg:hidden flex justify-center items-center">
            <img src="@/assets/image/IPESA-LOGO.png" alt="logo" class="w-56" />
          </div>
          <div class="h-[200px] border-r-2 border-black lg:flex hidden flex-col justify-center items-end">
            <p ref="productLineRef" class="text-gray-700 font-medium text-xl mr-4 mb-24" :class="productLineClass"
              @animationend="handleProductLineAnimationEnd">
              Linea de Productos
            </p>
          </div>
        </div>
        <div class="col-span-2 overflow-hidden lg:flex hidden flex-col justify-between items-start">
          <div class="flex items-end justify-start h-[230px] animate__animated animate__bounceIn animate__delay-1s">
            <img src="@/assets/image/IPESA-LOGO.png" alt="logo" class="w-4/5" />
          </div>
          <div class="h-[200px] flex flex-col justify-center items-start gap-4 animate__animated animate__fadeInUp">
            <h2 class="text-black font-bold text-3xl w-1/2">Construcción y Utilitarios</h2>
          </div>
        </div>
        <div class="border-l-2 border-gray-500 flex lg:hidden justify-center flex-col mt-4 px-4 col-span-2">
          <p ref="productLineRef" class="text-gray-700 font-medium text-base text-start" :class="productLineClass"
            @animationend="handleProductLineAnimationEnd">
            Linea de Productos
          </p>
          <h2 class="text-black font-bold text-start text-lg animate__animated animate__fadeInUp">
            Construcción y <br>Utilitarios
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import 'animate.css';

const animationStep = ref(0);
const showImage = ref(true);
const animationClass = ref('animate__zoomIn');
const productLineClass = ref('animate__animated animate__fadeInUp animate__delay-1s');
const productLineStep = ref(0);
const containerRef = ref<HTMLElement | null>(null);
const containerClass = ref('animate__animated'); // Clase inicial del contenedor

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
