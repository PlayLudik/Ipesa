<!-- layouts/landing.vue -->
<template>
    <div class="flex h-screen bg-gray-100 text-black flex-col md:flex-row">
        <!-- Sidebar -->
        <Sidebar :categories="categories" :selected-category="productoStore.categoriaSeleccionada"
            @select="seleccionarCategoria" />

        <!-- Contenido dinámico de la ruta -->
        <div class="flex-1 flex flex-col bg-gray-100 h-full p-4 overflow-y-auto">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import 'animate.css';
import Sidebar from '~/components/Sidebar.vue';
const productoStore = useProductosStore();
const { setCategoria } = productoStore;
const router = useRouter()
const categories = ['Excabación', 'Compactación', 'Energía', 'Minería', 'Soluciones Viales', 'Agrícola'];
function seleccionarCategoria(categoria: string) {
    setCategoria(categoria)
    if (router.currentRoute.value.name !== 'index') {
        router.push({ name: 'home' }) // o { path: '/' }
    }
}
</script>