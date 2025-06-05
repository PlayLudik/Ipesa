<!-- layouts/landing.vue -->
<template>
    <div class="flex h-screen bg-gray-100 text-black relative overflow-hidden">
        <!-- Sidebar -->
        <Sidebar ref="sidebarRef" :categories="categories" :selected-category="productoStore.categoriaSeleccionada"
            @select="seleccionarCategoria" />

        <!-- Contenido principal -->
        <div class="relative flex-1 flex flex-col h-full bg-[#0F0F0F] z-10">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import 'animate.css';
import { ref } from 'vue'
import Sidebar from '~/components/Sidebar.vue';
const productoStore = useProductosStore();
const { setCategoria } = productoStore;
const router = useRouter()
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