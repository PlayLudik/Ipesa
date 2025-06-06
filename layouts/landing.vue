<!-- layouts/landing.vue -->
<template>
    <div class="md:flex md:flex-row flex-col h-screen bg-gray-100 text-black relative overflow-hidden">
        <!-- Sidebar -->
        <Sidebar ref="sidebarRef" :categories="categories" :selected-category="productoStore.categoriaSeleccionada"
            @select="seleccionarCategoria" />

        <!-- Contenido principal + menú móvil -->
        <div class="relative flex-1 flex flex-col h-full bg-[#0F0F0F] z-10">
            <div class="flex-1 overflow-y-auto">
                <slot />
            </div>
            <!-- Menú móvil al fondo -->
            <!-- <MobileCategoryMenu class="md:hidden" :categories="categories"
                :selected-category="productoStore.categoriaSeleccionada" @select="seleccionarCategoria" /> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import 'animate.css';
import { ref } from 'vue'
import Sidebar from '~/components/Sidebar.vue';
import MobileCategoryMenu from '@/components/MobileCategoryMenu.vue'
import { useRouter, useRoute } from 'vue-router'
const productoStore = useProductosStore();
const { setCategoria } = productoStore;
const router = useRouter()
const route = useRoute()
const categories = ['Retroexcavadora', 'Excavadora', 'Cargador Frontal', 'Tractor de Orugas', 'Motoniveladora', 'Rodillos de Suelo', 'Minicargadores'];
const sidebarRef = ref()

function seleccionarCategoria(categoria: string) {
    setCategoria(categoria)
    // Navegar si no estás en home
    if (router.currentRoute.value.name !== 'index') {
        router.push({ name: 'home' })
    }
}
</script>