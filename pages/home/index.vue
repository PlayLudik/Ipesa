<template>
    <div class="flex items-center justify-center h-screen bg-gray-100 text-black overflow-hidden">
        <!-- Main Content -->
        <div ref="scrollContainer" class="flex-1 flex flex-col bg-gray-100 h-full p-4 overflow-y-auto"
            @scroll="handleScroll">
            <div class="flex items-center justify-between w-full">
                <img src="@/assets/image/IPESA-LOGO.png" alt="logo" class="w-28 mb-6" />
                <h3 class="text-xl font-semibold">{{ categoriaActual }}</h3>
            </div>
            <div class="grid grid-cols-12 gap-4">
                <div v-for="(product, index) in displayedProducts" :key="index"
                    class="col-span-3 cursor-pointer card-fade-up" @click="goToProduct(product.nombre)">
                    <ProductCard :nombre="product.nombre" :categoria="product.categoria"
                        :imagen="product.imagenes[0]" />
                </div>
            </div>

            <div v-if="loading" class="grid grid-cols-12 gap-4 mt-4">
                <div v-for="n in 8" :key="'skeleton-' + n" class="col-span-3">
                    <CardSkeleton />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'landing'
})
import { ref, onMounted } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import CardSkeleton from "@/components/CardSkeleton.vue";
import { useRouter } from 'vue-router';

const productoStore = useProductosStore();
const categoriaActual = computed(() => productoStore.categoriaSeleccionada);
const allProducts = ref<Producto[]>([]);
const displayedProducts = ref<Producto[]>([]);
const loading = ref(false);
const scrollContainer = ref<HTMLElement | null>(null);

// Cargar más productos simuladamente
function loadMoreProducts() {
    loading.value = true;

    setTimeout(() => {
        const more = allProducts.value.slice(displayedProducts.value.length, displayedProducts.value.length + 12);
        displayedProducts.value.push(...more);
        loading.value = false;
    }, 500);
}

// Detectar scroll
function handleScroll() {
    if (!scrollContainer.value || loading.value) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
        loadMoreProducts();
    }
}

const router = useRouter();

function goToProduct(product: string) {
    router.push(`/product/${encodeURIComponent(product)}`);
}

onMounted(async () => {
    if (productoStore.categoriaSeleccionada) {
        await productoStore.fetchProductos(productoStore.categoriaSeleccionada);
        allProducts.value = productoStore.productos;
        loadMoreProducts();
    }
});

watch(categoriaActual, async (nuevaCategoria) => {
    if (nuevaCategoria) {
        displayedProducts.value = [];
        allProducts.value = [];
        await productoStore.fetchProductos(nuevaCategoria);
        allProducts.value = productoStore.productos;
        loadMoreProducts();
        nextTick(() => {
            scrollContainer.value?.scrollTo({ top: 0, behavior: 'smooth' })
        })
    }
});
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