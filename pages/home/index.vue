<template>
    <div class="flex items-center justify-center h-screen text-black bg-[#0F0F0F]">

        <!-- Main Content -->
        <div ref="scrollContainer" class="flex-1 flex flex-col h-full overflow-y-auto overflow-x-visible relative z-0">
            <div class="flex items-center justify-between w-full h-20 px-2">
                <h3 class="md:text-xl text-2xl font-semibold md:mb-0 mb-4 text-white">{{ categoriaActual }}</h3>
            </div>
            <!-- Loader mientras carga -->
            <div v-if="loading" class="flex items-center justify-center w-full h-full">
                <svg class="animate-spin h-12 w-12 text-[#F8D146]" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z">
                    </path>
                </svg>
            </div>
            <div v-else
                class="bg-[url('@/assets/image/Categoria.png')] bg-cover bg-center flex-1 p-2 overflow-x-hidden flex flex-col">
                <div class="grid grid-cols-12 gap-4">
                    <div v-for="(product, index) in paginatedProducts" :key="index"
                        class="lg:col-span-4 col-span-6 cursor-pointer card-fade-up"
                        @click="goToProduct(product.nombre)">
                        <ProductCard :nombre="product.nombre" :categoria="product.categoria"
                            :imagen="product.imagenes[0]" />
                    </div>
                </div>

                <!--Pagination-->
                <Pagination :current-page="currentPage" :total-pages="totalPages" @update:page="currentPage = $event" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'landing'
})
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ProductCard from '@/components/ProductCard.vue';
import Pagination from '@/components/Pagination.vue'

const productoStore = useProductosStore();
const categoriaActual = computed(() => productoStore.categoriaSeleccionada);
const allProducts = ref<Producto[]>([]);
const displayedProducts = ref<Producto[]>([]);
const loading = ref(false);
const scrollContainer = ref<HTMLElement | null>(null);
const currentPage = ref(1)
const perPage = 6

const totalPages = computed(() => Math.ceil(allProducts.value.length / perPage))

const paginatedProducts = computed(() =>
    allProducts.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage)
)

const router = useRouter();

function goToProduct(product: string) {
    router.push(`/product/${encodeURIComponent(product)}`);
}

onMounted(async () => {
    loading.value = true
    if (productoStore.categoriaSeleccionada) {
        await productoStore.fetchProductos(productoStore.categoriaSeleccionada);
        allProducts.value = productoStore.productos;
    }
    loading.value = false
});

watch(categoriaActual, async (nuevaCategoria) => {
    if (nuevaCategoria) {
        loading.value = true
        displayedProducts.value = [];
        allProducts.value = [];
        await productoStore.fetchProductos(nuevaCategoria);
        allProducts.value = productoStore.productos;
        loading.value = false
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