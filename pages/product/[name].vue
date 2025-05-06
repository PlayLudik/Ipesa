<template>
    <div class="flex flex-col h-full p-4">
        <div class="flex items-center justify-between bg-gray-100">
            <h1 class="text-3xl text-black font-bold">{{ productName }}</h1>
            <div class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer transition duration-200"
                @click="handleClose">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-600" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                </svg>
            </div>
        </div>
        <div class="flex gap-4 mt-4 p-4 w-full bg-white h-full">
            <div class="w-1/2 flex flex-col">
                <!-- Imagen principal grande -->
                <div class="overflow-hidden w-full relative h-96">
                    <div v-if="!imagenesCargadas[0]"
                        class="w-full h-full bg-gray-200 shimmer absolute inset-0 card-fade-up z-0"></div>
                    <img v-if="producto?.imagenes?.[0]" :src="producto.imagenes[0]" alt="Imagen principal"
                        class="w-full h-full object-cover z-10 relative" @load="imagenesCargadas[0] = true" />
                </div>
                <!-- Miniaturas -->
                <div class="grid grid-cols-3 gap-4 mt-4">
                    <div v-for="(img, index) in producto?.imagenes?.slice(1, 4)" :key="index"
                        class="relative h-24 w-full border border-gray-300 rounded-lg overflow-hidden shadow hover:shadow-md transition duration-300 cursor-pointer">
                        <div v-if="!imagenesCargadas[index + 1]"
                            class="absolute inset-0 bg-gray-300 shimmer card-fade-up z-0"></div>
                        <img :src="img" alt="Miniatura" class="w-full h-full object-cover z-10 relative"
                            @load="imagenesCargadas[index + 1] = true" />
                    </div>
                </div>
            </div>
            <div class="p-4">
                <h2 class="text-2xl text-black font-semibold">Especificaciones</h2>
                <ul class="mt-4 space-y-2 list-disc pl-5">
                    <template v-if="producto">
                        <template v-if="producto.especificaciones && Object.keys(producto.especificaciones).length">
                            <li v-for="(value, key) in producto.especificaciones" :key="key" class="text-gray-700">
                                {{ formatearClave(String(key)) }}: {{ value }}
                            </li>
                        </template>
                        <li v-else class="text-gray-500 italic">No hay especificaciones disponibles.</li>
                    </template>
                    <li v-else class="text-gray-400 italic">Cargando especificaciones...</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'landing'
})
import { useRoute } from 'vue-router';

const route = useRoute();
const productName = route.params.name as string;
const productoStore = useProductosStore();

function handleClose() {
    window.history.back();
}
function formatearClave(key: string) {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}
// Encuentra el producto por nombre
const producto = ref<Producto>()
const imagenesCargadas = ref<boolean[]>([])

// Cargar productos en el onMounted si no están cargados aún
onMounted(async () => {
    if (!productoStore.productos.length) {
        await productoStore.fetchProductos()
    }
})

// Watch para actualizar `producto` cuando se cargan los productos
watch(
    () => productoStore.productos,
    (nuevosProductos) => {
        const encontrado = nuevosProductos.find(p => p.nombre === productName)
        if (encontrado) {
            producto.value = encontrado
        }
        if (encontrado?.imagenes) {
            imagenesCargadas.value = encontrado.imagenes.map(() => false)
        }
    },
    { immediate: true }
)

</script>
<style scoped>
@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.card-fade-up {
    animation: fadeUp 0.4s ease-out;
}
</style>