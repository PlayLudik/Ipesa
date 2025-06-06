<template>
    <div class="flex items-center justify-center gap-2 text-white select-none mt-4">
        <!-- Flecha izquierda -->
        <button :disabled="currentPage === 1" @click="$emit('update:page', currentPage - 1)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
        </button>

        <!-- Páginas -->
        <span v-for="page in visiblePages" :key="page" class="cursor-pointer" :class="[
            'px-3 py-1 text-sm transition',
            page === currentPage
                ? 'bg-[#F8D146] md:bg-transparent md:text-white text-black underline font-bold'
                : 'hover:underline font-medium'
        ]" @click="() => typeof page === 'number' && $emit('update:page', page)">
            {{ page === '...' ? '...' : page }}
        </span>

        <!-- Flecha derecha -->
        <button :disabled="currentPage === totalPages" @click="$emit('update:page', currentPage + 1)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    currentPage: number
    totalPages: number
}>()

const emit = defineEmits<{
    (e: 'update:page', page: number): void
}>()

const visiblePages = computed(() => {
    const pages: (number | string)[] = []
    const { currentPage, totalPages } = props

    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
        pages.push(1)

        if (currentPage > 4) pages.push('...')

        const start = Math.max(2, currentPage - 1)
        const end = Math.min(totalPages - 1, currentPage + 1)
        for (let i = start; i <= end; i++) pages.push(i)

        if (currentPage < totalPages - 3) pages.push('...')

        pages.push(totalPages)
    }

    return pages
})
</script>