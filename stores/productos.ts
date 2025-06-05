import { defineStore } from "pinia";
interface IProductoState {
	productos: Producto[];
	categoriaSeleccionada: string;
}

export const useProductosStore = defineStore("productos", {
	state: (): IProductoState => ({
		productos: [],
		categoriaSeleccionada: "Retroexcavadora",
	}),
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
			} catch (error) {
				console.error("Error al obtener productos:", error);
			}
		},
		setCategoria(categoria: string) {
			this.categoriaSeleccionada = categoria;
		},
	},
});
