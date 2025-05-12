<template>
    <div
        class="md:w-[250px] w-full md:bg-gray-100 bg-gray-200 md:h-full h-16 flex flex-col items-center justify-between md:p-4 p-0 md:border-r-2 md:border-black">

        <div class="relative flex items-center justify-between w-full bottom-2 px-2 py-4 md:hidden">
            <!-- Botón de hamburguesa -->
            <button @click="toggleMenu" class="p-3">
                <span class="block w-6 h-1 bg-gray-600 mb-1"></span>
                <span class="block w-6 h-1 bg-gray-600 mb-1"></span>
                <span class="block w-6 h-1 bg-gray-600"></span>
            </button>

            <img src="@/assets/image/IPESA-LOGO.png" alt="logo" class="w-24" />

            <!-- Menú desplegable -->
            <div :class="{ 'block': isMenuOpen, 'hidden': !isMenuOpen }"
                class="md:hidden absolute top-16 left-0 bg-gray-200 w-full p-4 z-30">
                <ul class="space-y-4 w-full">
                    <li v-for="item in categories" :key="item"
                        class="text-start uppercase text-lg font-bold text-gray-600"><a :class="[
                            'cursor-pointer text-start uppercase text-sm font-semibold',
                            selectedCategory === item ? 'text-black' : 'text-gray-500'
                        ]" @click="onCategoryClick(item)">
                            {{ item }}
                        </a></li>
                </ul>
            </div>
        </div>

        <!-- Logo para pantallas grandes -->
        <img src="@/assets/image/IPESA-LOGO.png" alt="logo" class="w-28 my-4 md:block hidden" />

        <!-- Menú de categorías para pantallas grandes -->
        <div class="hidden border-t-2 border-black w-full flex-1 md:flex items-start justify-center">
            <ul class="mt-4">
                <li v-for="item in categories" :key="item"
                    class="text-start uppercase text-lg font-bold mb-4 text-gray-600">
                    <a :class="[
                        'cursor-pointer text-start uppercase text-lg font-bold mb-4',
                        selectedCategory === item ? 'text-black' : 'text-gray-500'
                    ]" @click="onCategoryClick(item)">
                        {{ item }}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
    categories: string[]
    selectedCategory: string
}>()

const emit = defineEmits<{
    (e: 'select', category: string): void
}>()

function onCategoryClick(category: string) {
    emit('select', category)
}

const isMenuOpen = ref(false)

function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
}
</script>