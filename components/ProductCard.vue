<template>
    <div class="w-full bg-transparent max-w-xs shadow hover:shadow-md transition duration-300 cursor-pointer">
        <!-- Skeleton shimmer mientras carga -->
        <div class="w-full md:h-44 h-20 relative">
            <div v-if="!imageLoaded" class="absolute inset-0 bg-[rgba(0,0,0,0.4)] rounded"></div>

            <img :src="imagen" alt="Imagen del producto" loading="lazy" @load="imageLoaded = true"
                class="w-full h-full object-contain transition-opacity duration-700 ease-in-out hover-outline-glow"
                :class="imageLoaded ? 'opacity-100 delay-100' : 'opacity-0'" />
        </div>

        <div class="p-4">
            <p class="md:text-lg text-base font-bold text-white text-center">{{ nombre }}</p>
            <p class="md:text-sm font-medium text-xs text-[rgba(255,255,255,0.40)] mb-1 text-center">{{ categoria }}</p>
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
    background: linear-gradient(90deg,
            rgba(255, 255, 255, 0.02) 0%,
            rgba(255, 255, 255, 0.03) 50%,
            rgba(255, 255, 255, 0.05) 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 0.5rem;
    backdrop-filter: blur(1px);
}

.hover-outline-glow:hover {
    transform: scale(1.10);
    filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.40)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.40));
    transition: transform 0.3s ease, filter 0.3s ease;
}
</style>
