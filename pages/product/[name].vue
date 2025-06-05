<template>
    <div class="flex flex-col h-full md:p-4 md:pb-0 md:pr-0 p-0">
        <div class="flex items-center gap-4 bg-[#0F0F0F]">
            <div class="ml-8 px-4 py-2 border border-[#444341] text-white flex gap-4 items-center justify-center cursor-pointer transition duration-200 text-xs font-semibold"
                @click="handleClose">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Volver atrás
            </div>
            <div class="flex gap-2 items-center">
                <p class="text-base text-white font-normal underline">{{ categoriaActual }}</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                <h1 class="text-base text-white font-normal">{{ productName }}</h1>
            </div>
        </div>
        <div
            class="flex flex-col md:flex-row gap-4 mt-4 p-4 w-full h-full bg-[url('@/assets/image/Categoria.png')] bg-cover bg-center rounded-md">
            <div class="md:w-1/2 w-full flex flex-col">
                <!-- Imagen principal grande -->
                <div class="overflow-hidden w-full relative md:h-[25rem] h-44">
                    <div v-if="!imagenesCargadas[0]"
                        class="w-full h-full bg-gray-200 shimmer absolute inset-0 card-fade-up z-0"></div>
                    <img v-if="producto?.imagenes?.[0]" :src="producto.imagenes[0]" alt="Imagen principal"
                        class="w-full h-full object-contain z-10 relative" @load="imagenesCargadas[0] = true" />
                </div>
                <!-- Miniaturas -->
                <!-- <div class="grid grid-cols-3 gap-3 mt-4">
                    <div v-for="(img, index) in producto?.imagenes?.slice(1, 4)" :key="index"
                        class="relative md:h-24 h-14 w-full border border-gray-300 rounded-lg overflow-hidden shadow hover:shadow-md transition duration-300 cursor-pointer">
                        <div v-if="!imagenesCargadas[index + 1]"
                            class="absolute inset-0 bg-gray-300 shimmer card-fade-up z-0"></div>
                        <img :src="img" alt="Miniatura" class="w-full h-full object-cover z-10 relative"
                            @load="imagenesCargadas[index + 1] = true" />
                    </div>
                </div> -->
            </div>
            <div class="p-4">
                <h1 class="text-2xl text-white font-bold">John Deere <br> {{ productName }}</h1>
                <hr class="my-4 border-[rgba(255,255,255,0.4)]" />
                <h2 class="text-base text-white font-semibold uppercase">Especificaciones</h2>
                <ul class="mt-4 space-y-2 list-disc pl-5 w-full">
                    <template v-if="producto">
                        <template v-if="producto.especificaciones && Object.keys(producto.especificaciones).length">
                            <li v-for="(value, key) in producto.especificaciones" :key="key"
                                class="text-white flex gap-2 -ml-4">
                                <img :src="icon" alt="icon" class="w-4 h-4 mt-1" /><span class="font-bold">{{
                                    formatearClave(String(key)) }}</span>: {{
                                        value }}
                            </li>
                        </template>
                        <li v-else class="text-gray-500 italic">No hay especificaciones disponibles.</li>
                        <div class="flex justify-center pt-6">
                            <a v-if="producto?.pdfUrl" :href="producto.pdfUrl" download
                                class="inline-flex cursor-pointer items-center gap-2 px-5 py-2.5 rounded-full bg-[#F8D146] text-[#0F0F0F] font-semibold text-sm uppercase tracking-wide shadow-md hover:bg-[#e7c230] transition">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0 0l-3-3m3 3l3-3M12 3v9" />
                                </svg>
                                Descargar PDF
                            </a>
                        </div>

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
import icon from '@/assets/image/icons/icon_especificaciones.svg'

const route = useRoute();
const router = useRouter();
const productName = route.params.name as string;
const productoStore = useProductosStore();
const categoriaActual = computed(() => productoStore.categoriaSeleccionada);

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

    // Esperar a que estén cargados para buscar el producto
    const encontrado = productoStore.productos.find(p => p.nombre === productName)
    if (encontrado) {
        producto.value = encontrado
        imagenesCargadas.value = encontrado.imagenes?.map(() => false) || []
    } else {
        router.replace('/404')
    }
})

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