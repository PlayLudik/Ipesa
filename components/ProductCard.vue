<template>
    <div
        class="w-full bg-transparent max-w-xs overflow-hidden shadow hover:shadow-md transition duration-300 cursor-pointer">
        <!-- Skeleton shimmer mientras carga -->
        <div class="w-full md:h-44 h-20 relative">
            <div v-if="!imageLoaded" class="absolute inset-0 shimmer bg-[#1A1A1A] rounded"></div>

            <img :src="imagen" alt="Imagen del producto" loading="lazy" @load="imageLoaded = true"
                class="w-full h-full object-contain transition-opacity duration-700 ease-in-out"
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
            rgba(255, 255, 255, 0.05) 0%,
            rgba(255, 255, 255, 0.12) 50%,
            rgba(255, 255, 255, 0.05) 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 0.5rem;
    backdrop-filter: blur(1px);
}
</style>
