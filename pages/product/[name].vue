<template>
    <div class="flex flex-col min-h-screen md:p-4 md:pb-0 md:pr-0 pb-4">
        <div class="flex items-center gap-4 md:px-0 px-2 bg-[#0F0F0F] md:h-14 h-10">
            <div class="ml-8 px-4 py-2 border border-[#444341] text-white md:flex hidden gap-4 items-center justify-center cursor-pointer transition duration-200 text-xs font-semibold"
                @click="handleClose">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Volver atrás
            </div>
            <div class="flex gap-2 items-center">
                <p class="text-base text-white font-normal underline ">{{ categoriaActual }}</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                <h1 class="text-base text-white font-normal">{{ productName }}</h1>
            </div>
        </div>
        <div class="flex-1 flex flex-col h-full overflow-y-auto w-full justify-center items-center lg:flex-row gap-4 p-4 
     bg-[url('@/assets/image/Producto.webp')] bg-cover bg-center rounded-md 
     custom-scroll">
            <!--Volver Mobile-->
            <div class="px-4 py-2 mb-6 border self-start max-w-36 border-[#444341] text-white flex md:hidden gap-4 items-center justify-center cursor-pointer transition duration-200 text-xs font-semibold bg-[#444341]"
                @click="handleClose">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Volver atrás
            </div>
            <div class="lg:w-1/2 w-full flex flex-col">
                <!-- Imagen principal grande -->
                <div class="w-full relative md:h-[25rem] h-44">
                    <div v-if="!imagenesCargadas[0]"
                        class="w-full h-full bg-[#0F0F0F] shimmer absolute inset-0 card-fade-up z-0"></div>
                    <img v-if="producto?.imagenes?.[0]" :src="producto.imagenes[0]" alt="Imagen principal"
                        class="w-full h-full object-contain z-10 relative hover-outline-glow transition-all duration-300 animate__animated animate__fadeInLeft"
                        @load="imagenesCargadas[0] = true" />
                </div>
            </div>
            <div class="p-2">
                <h1 class="text-2xl text-white font-bold animate__animated animate__fadeInDown animate__delay-0_2s">
                    <span>{{ descripcionActual }}</span> <br> <span>{{ productName
                        }}</span>
                </h1>
                <hr
                    class="my-4 border-[rgba(255,255,255,0.4)] animate__animated animate__fadeInDown animate__delay-0_4s" />
                <h2
                    class="text-base text-white font-semibold uppercase animate__animated animate__fadeInDown animate__delay-0_6s">
                    Especificaciones</h2>
                <ul
                    class="mt-4 space-y-2 list-disc md:pl-4 pl-0 w-full animate__animated animate__fadeInDown animate__delay-0_8s">
                    <template v-if="producto">
                        <template v-if="producto.especificaciones && Object.keys(producto.especificaciones).length">
                            <div class="grid grid-cols-2 gap-x-2 gap-y-2 text-sm text-white">
                                <template v-for="(value, key) in producto.especificaciones" :key="key">
                                    <!-- Columna de clave -->
                                    <div class="flex items-start gap-2">
                                        <img :src="icon" alt="icon" class="w-4 h-4 mt-1" />
                                        <span class="font-bold">{{ formatearClave(String(key)) }}</span>
                                    </div>

                                    <!-- Columna de valor -->
                                    <div class="text-left">
                                        {{ value }}
                                    </div>
                                </template>
                            </div>
                        </template>
                        <li v-else class="text-white italic">No hay especificaciones disponibles.</li>
                        <div class="flex justify-center md:justify-start items-center py-6">
                            <a v-if="producto?.pdfUrl" :href="producto.pdfUrl" download
                                class="inline-flex cursor-pointer items-center gap-2 px-5 py-2.5 rounded-full bg-[#F8D146] text-[#0F0F0F] font-semibold md:text-sm text-xs uppercase tracking-wide shadow-md hover:bg-[#e7c230] transition">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0 0l-3-3m3 3l3-3M12 3v9" />
                                </svg>
                                Descargar Ficha Técnica
                            </a>
                        </div>

                    </template>
                    <li v-else class="text-white italic">Cargando especificaciones...</li>
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
const descripcionActual = computed(() => {
    const producto = productoStore.productos.find(p => p.nombre === productName);
    return producto ? producto.descripcion : '';
});



function handleClose() {
    window.history.back();
}
function formatearClave(key: string) {
    return key
        .replace(/_/g, ' ')
        .replace(/(^|\s)([^\s])/gu, (_, espacio, letra) => espacio + letra.toUpperCase());
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
        router.replace('/not-found')
    }
})

</script>
<style scoped>
@import 'animate.css';

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

.hover-outline-glow {
    transform: scale(1);
    filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.40)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.40));
    transition: transform 0.3s ease, filter 0.3s ease;
}

.animate__delay-0_2s {
    animation-delay: 0.2s;
}

.animate__delay-0_4s {
    animation-delay: 0.4s;
}

.animate__delay-0_6s {
    animation-delay: 0.6s;
}

.animate__delay-0_8s {
    animation-delay: 0.8s;
}

/* Para navegadores WebKit como Chrome, Safari */
.custom-scroll::-webkit-scrollbar {
    width: 6px;
}

.custom-scroll::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scroll::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
}

/* Para Firefox */
.custom-scroll {
    scrollbar-width: thin;
    /* más delgado */
    scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}
</style>