<template>
    <div ref="menuWrapperRef"
        class="md:w-[210px] overflow-x-hidden w-full h-14 md:h-screen flex md:flex-col items-center justify-between">

        <!-- Logo en pantallas grandes -->
        <div class="hidden md:flex items-center justify-between w-full h-20 overflow-hidden">
            <div class="flex-1 bg-white h-full flex items-center justify-center">
                <img src="@/assets/image/IPESA-LOGO.png" alt="Ipesa" class="w-28" />
            </div>
            <div class="bg-[#0F0F0F] h-full w-[15px]" />
        </div>

        <!-- Logo y botón hamburguesa en mobile -->
        <div class="w-full md:hidden flex items-center justify-between h-14 px-2 bg-[#0F0F0F]">
            <img src="@/assets/image/IPESA-LOGO-White.png" alt="Ipesa" class="w-24" :class="{ '': isProductDetail }" />

            <div class="md:hidden bg-[#535353] px-2 py-3">
                <button @click="toggleMenu" class="flex flex-col gap-1">
                    <span class="block w-6 h-0.5 bg-white transition-all duration-300"></span>
                    <span class="block w-6 h-0.5 bg-white transition-all duration-300"></span>
                    <span class="block w-6 h-0.5 bg-white transition-all duration-300"></span>
                </button>
            </div>
        </div>

        <!-- Menú scrollable para pantallas grandes -->
        <div class="hidden md:flex flex-col flex-1 overflow-y-auto bg-[#0F0F0F] w-full items-start custom-scroll">
            <ul class="w-full">
                <li v-for="(item, index) in categories" :key="item" class="mb-4 w-full">
                    <CategoryItem :category="item" :is-active="selectedCategory === item" @click="onCategoryClick" />
                </li>
            </ul>
        </div>
    </div>

    <!-- Menú lateral y overlay fuera del flujo para evitar scroll -->
    <transition name="slide-left">
        <div v-if="isMenuOpen">
            <!-- Overlay -->
            <div @click="toggleMenu" class="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"></div>

            <!-- Menú lateral -->
            <div class="fixed top-0 left-0 w-64 h-screen bg-[#0F0F0F] text-white shadow-lg z-40 flex flex-col">
                <!-- Botón de cierre flotante -->
                <button @click="toggleMenu"
                    class="absolute -right-6 top-6 w-6 h-14 bg-[#444341] text-white rounded-r-md shadow-md flex items-center justify-center z-50">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <div class="flex gap-4 px-6 pt-6 pb-4">
                    <img src="@/assets/image/IPESA-LOGO-White.png" alt="Ipesa" class="w-24" />
                </div>
                <hr class="border-[rgba(255,255,255,0.4)] mb-4" />
                <p class="uppercase text-base text-white font-bold px-6 pb-6">Seleccionar una Categoría</p>
                <div class="flex flex-col flex-1 overflow-y-auto custom-scroll">
                    <MobileCategoryItem v-for="cat in categories" :key="cat" :category="cat"
                        :is-active="selectedCategory === cat" @click="onCategoryClick(cat)" />
                </div>
            </div>
        </div>
    </transition>
</template>


<script setup lang="ts">
import { defineProps, defineEmits, ref, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import CategoryItem from '@/components/CategoryItem.vue'
import MobileCategoryItem from '@/components/MobileCategoryItem.vue'
const props = defineProps<{
    categories: string[]
    selectedCategory: string
}>()
const router = useRouter()
const route = useRoute()
const isProductDetail = computed(() => route.name === 'product-name')
const productoStore = useProductosStore()
const menuWrapperRef = ref<HTMLElement | null>(null);
const emit = defineEmits<{
    (e: 'select', category: string): void
}>()

function onCategoryClick(category: string) {
    emit('select', category)
}

const isMenuOpen = ref(false)

function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
}
</script>
<style scoped>
/* Transición suave de izquierda */
.slide-left-enter-active,
.slide-left-leave-active {
    transition: transform 0.3s ease;
}

.slide-left-enter-from {
    transform: translateX(-100%);
}

.slide-left-enter-to {
    transform: translateX(0%);
}

.slide-left-leave-from {
    transform: translateX(0%);
}

.slide-left-leave-to {
    transform: translateX(-100%);
}

/* Para navegadores WebKit como Chrome, Safari */
.custom-scroll::-webkit-scrollbar {
    width: 6px;
}

.custom-scroll::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scroll::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
}

/* Para Firefox */
.custom-scroll {
    scrollbar-width: thin;
    /* más delgado */
    scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}
</style>
