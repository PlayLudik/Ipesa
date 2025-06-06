<template>
    <div class="min-h-screen flex items-center justify-center bg-[#0F0F0F] p-6">
        <div class="text-center max-w-md animate__animated animate__fadeInUp">
            <!-- Imagen ilustrativa del error -->
            <img src="/images/404.png" alt="Producto no encontrado" class="w-64 mx-auto mb-6" />

            <!-- Código de error -->
            <h1 class="text-6xl font-extrabold text-white">404</h1>

            <!-- Mensaje de error -->
            <p class="mt-4 text-xl text-gray-300 font-medium">
                Página no encontrada
            </p>
            <p class="text-gray-400 mt-2 text-sm">
                Lo sentimos, no pudimos encontrar la página que estás buscando.
            </p>

            <!-- Botón para volver al inicio -->
            <button @click="volverAlInicio"
                class="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F8D146] text-[#0F0F0F] font-semibold text-sm uppercase tracking-wide shadow-md hover:bg-[#e7c230] transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10h14V10" />
                </svg>
                Volver al inicio
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const volverAlInicio = () => {
    window.location.href = '/home'
}
</script>

<style scoped>
@import 'animate.css';
</style>
