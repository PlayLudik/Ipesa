import { defineStore } from "pinia";
interface IProductoState {
	productos: Producto[];
	categoriaSeleccionada: string;
	currentPage: number;
	perPage: number;
}

export const useProductosStore = defineStore("productos", {
	state: (): IProductoState => ({
		productos: [],
		categoriaSeleccionada: "Retroexcavadora",
		currentPage: 1,
		perPage: 6,
	}),
	getters: {
		totalPages: (state) => Math.ceil(state.productos.length / state.perPage),
		paginatedProducts(state): Producto[] {
			const start = (state.currentPage - 1) * state.perPage;
			const end = state.currentPage * state.perPage;
			return state.productos.slice(start, end);
		},
	},
	actions: {
		async fetchProductos(categoria?: string) {
			try {
				const data = await $fetch<Producto[]>("/productos.json");
				// Filtramos por categoría si se especifica
				const filtrados = categoria
					? data.filter((producto) => producto.categoria === categoria)
					: data;

				this.categoriaSeleccionada = categoria ?? "Retroexcavadora";
				this.productos = filtrados;
				this.currentPage = 1;
			} catch (error) {
				console.error("Error al obtener productos:", error);
			}
		},
		setCategoria(categoria: string) {
			this.categoriaSeleccionada = categoria;
		},
		setPage(page: number) {
			this.currentPage = page;
		},
	},
});
