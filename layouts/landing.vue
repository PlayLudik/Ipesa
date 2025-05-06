<!-- layouts/landing.vue -->
<template>
    <div class="flex h-screen bg-gray-100 text-black overflow-hidden">
        <!-- Sidebar -->
        <div
            class="w-[250px] bg-gray-100 h-full flex flex-col items-center justify-between p-4 border-r-2 border-black">
            <img src="@/assets/image/IPESA-LOGO.png" alt="logo" class="w-28 my-4" />
            <div class="border-t-2 border-black w-full flex-1 flex items-start justify-center">
                <ul class="mt-4">
                    <li v-for="item in categories" :key="item"
                        class="text-start uppercase text-lg font-bold mb-4 text-gray-600">
                        <a :class="[
                            'cursor-pointer text-start uppercase text-lg font-bold mb-4',
                            productoStore.categoriaSeleccionada === item ? 'text-black' : 'text-gray-600'
                        ]" @click="seleccionarCategoria(item)">{{ item }}</a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Contenido dinámico de la ruta -->
        <div class="flex-1 flex flex-col bg-gray-100 h-full p-4 overflow-y-auto">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import 'animate.css';
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