import { defineStore } from "pinia";
interface IProductoState {
	productos: Producto[];
	categoriaSeleccionada: string;
}

export const useProductosStore = defineStore("productos", {
	state: (): IProductoState => ({
		productos: [],
		categoriaSeleccionada: "Excabación",
	}),
	actions: {
		async fetchProductos(categoria?: string) {
			try {
				const url = categoria
					? `/api/listar-productos?categoria=${encodeURIComponent(categoria)}`
					: "/api/listar-productos";

				const data = await $fetch<Producto[]>(url);
				this.categoriaSeleccionada = categoria ?? "Excabación";
				this.productos = data;
			} catch (error) {
				console.error("Error al obtener productos:", error);
			}
		},
		setCategoria(categoria: string) {
			this.categoriaSeleccionada = categoria;
		},
	},
});
