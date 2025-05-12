<template>
    <div
        class="w-full bg-white max-w-xs border border-gray-300 rounded-lg overflow-hidden shadow hover:shadow-md transition duration-300 cursor-pointer">
        <!-- Skeleton o imagen -->
        <div class="w-full md:h-32 h-20 bg-white relative">
            <div v-if="!imageLoaded" class="absolute inset-0 shimmer bg-gray-300 rounded"></div>
            <img :src="imagen" alt="Imagen del producto"
                class="w-full h-full object-contain transition-opacity duration-300"
                :class="{ 'opacity-0': !imageLoaded }" @load="imageLoaded = true" />
        </div>
        <div class="p-4">
            <p class="md:text-sm text-xs text-gray-500 mb-1">{{ categoria }}</p>
            <p class="md:text-lg text-base font-semibold text-gray-800">{{ nombre }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
    nombre: string;
    categoria: string;
    imagen: string;
}>();

const imageLoaded = ref(false);
</script>

<style scoped>
.shimmer {
    background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }

    100% {
        background-position: 200% 0;
    }
}
</style>