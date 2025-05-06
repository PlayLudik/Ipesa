export {};

declare global {
	export interface EspecificacionesGenerales {
		[key: string]: string;
	}

	export interface Producto {
		id: number;
		nombre: string;
		descripcion: string;
		categoria: string;
		especificaciones: EspecificacionesGenerales;
		imagenes: string[];
	}

	export interface ProductoCreado extends Omit<Producto, "id"> {} // Si el ID se genera automáticamente

	export interface ProductoActualizado extends Partial<Omit<Producto, "id">> {
		id: number;
	}
}
