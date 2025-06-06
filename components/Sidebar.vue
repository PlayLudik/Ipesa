<template>
    <div class="md:w-[220px] overflow-x-hidden w-full h-14 md:h-screen flex md:flex-col items-center justify-between">
        <!-- Logo en pantallas grandes -->
        <div class="hidden md:flex items-center justify-between w-full h-20 overflow-hidden">
            <div class="flex-1 bg-white h-full flex items-center justify-center">
                <img src="@/assets/image/IPESA-LOGO.png" alt="Ipesa" class="w-28" />
            </div>
            <div class="bg-[#0F0F0F] h-full w-[15px]" />
        </div>
        <!--Logo Mobile-->
        <div class="w-full md:hidden flex items-center justify-between h-14 px-2 bg-[#0F0F0F]">
            <img src="@/assets/image/IPESA-LOGO-White.png" alt="Ipesa" class="w-24"
                :class="{ 'mx-auto': isProductDetail }" />
            <!-- Pagination para mobile (oculto en md y superiores) -->
            <div class="md:hidden z-50" v-if="!isProductDetail">
                <Pagination :current-page="productoStore.currentPage" :total-pages="productoStore.totalPages"
                    @update:page="productoStore.setPage" />
            </div>
        </div>

        <!-- Menú scrollable para pantallas grandes -->
        <div class="hidden md:flex flex-col flex-1 overflow-y-auto bg-[#0F0F0F] w-full items-start">
            <ul class="w-full">
                <li v-for="(item, index) in categories" :key="item" class="mb-4 w-full">
                    <CategoryItem :category="item" :is-active="selectedCategory === item" @click="onCategoryClick" />
                </li>
            </ul>
        </div>
    </div>
</template>


<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import CategoryItem from '@/components/CategoryItem.vue'
const props = defineProps<{
    categories: string[]
    selectedCategory: string
}>()
const router = useRouter()
const route = useRoute()
const isProductDetail = computed(() => route.name === 'product-name')
const productoStore = useProductosStore()
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