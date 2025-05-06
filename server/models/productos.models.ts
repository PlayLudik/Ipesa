export interface Especificaciones {
	[clave: string]: string | number;
}

export interface Producto {
	id: number;
	nombre: string;
	descripcion: string;
	categoria: string;
	especificaciones: Especificaciones;
	imagenes: string[];
}
