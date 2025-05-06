import { Producto } from "~/server/models/productos.models";
import { readFile } from "fs/promises";
import { join } from "path";

export default defineEventHandler(async (event) => {
	const { categoria } = getQuery(event);

	const dataPath = join(process.cwd(), "server/data/productos.json");
	const raw = await readFile(dataPath, "utf-8");
	const productos: Producto[] = JSON.parse(raw);

	if (categoria) {
		const filtrados = productos.filter(
			(producto) =>
				producto.categoria.toLowerCase() === categoria.toString().toLowerCase()
		);
		return filtrados;
	}

	return productos;
});
