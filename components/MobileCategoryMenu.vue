<template>
    <div class="w-full bg-[#0F0F0F] h-48 text-white border-t border-gray-700 shadow-inner">
        <div class="flex items-center overflow-hidden relative">
            <!-- Botón Izquierda -->
            <button v-if="showLeft" @click="scrollLeft"
                class="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-[#444341] rounded-full p-1 shadow-md">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <!-- Lista deslizable -->
            <ul ref="scrollRef" class="flex space-x-3 overflow-x-auto no-scrollbar px-6 mx-auto w-full scroll-smooth">
                <li v-for="category in categories" :key="category">
                    <CategoryItem :category="category" :is-active="selectedCategory === category"
                        @click="onCategoryClick(category)" />
                </li>
            </ul>

            <!-- Botón Derecha -->
            <button v-if="showRight" @click="scrollRight"
                class="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-[#444341] rounded-full p-1 shadow-md">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import CategoryItem from '@/components/CategoryItem.vue'

const props = defineProps<{
    categories: string[]
    selectedCategory: string
}>()

const emit = defineEmits<{
    (e: 'select', category: string): void
}>()

const scrollRef = ref<HTMLElement | null>(null)
const showLeft = ref(false)
const showRight = ref(false)

function onCategoryClick(category: string) {
    emit('select', category)
}

function scrollLeft() {
    scrollRef.value?.scrollBy({ left: -150, behavior: 'smooth' })
}

function scrollRight() {
    scrollRef.value?.scrollBy({ left: 150, behavior: 'smooth' })
}

function updateButtonVisibility() {
    const el = scrollRef.value
    if (!el) return

    showLeft.value = el.scrollLeft > 0
    showRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth
}

onMounted(() => {
    const el = scrollRef.value
    if (el) {
        updateButtonVisibility()
        el.addEventListener('scroll', updateButtonVisibility)
        // También actualizar visibilidad si cambia el contenido
        watchEffect(() => {
            // pequeño delay para esperar render
            setTimeout(() => updateButtonVisibility(), 50)
        })
    }
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
