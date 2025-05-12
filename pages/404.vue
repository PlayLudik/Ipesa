<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div class="text-center">
            <h1 class="text-6xl font-extrabold text-gray-800 animate__animated animate__fadeInDown">404</h1>
            <p class="mt-4 text-xl text-gray-600 animate__animated animate__fadeInUp">
                Página no encontrada
            </p>
            <p class="text-gray-500 mt-2">
                Lo sentimos, no pudimos encontrar la página que buscas.
            </p>
            <button @click="volverAlInicio"
                class="mt-6 bg-gray-800 text-white font-semibold px-6 py-3 rounded-md hover:bg-gray-700 transition-all">
                Volver al inicio
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const volverAlInicio = () => {
    window.location.href = '/home';
}
</script>

<style scoped>
@import 'animate.css';
</style>