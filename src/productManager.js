import fs from "fs";

export default class ProductManager {
	#products;
	#path;

	constructor(fileName) {
		this.#products = [];
		this.#path = `${fileName}.json`;
	};

	getProducts() {
		// Validar si existe el archivo:
		if (!fs.existsSync(this.#path)) {
			try {
				// Si no existe, crearlo:
				fs.writeFileSync(this.#path, JSON.stringify(this.#products));
			} catch (err) {
				return `Error al obtener los productos: ${err}`;
			};
		};
		
		// Leer el archivo y convertirlo en objeto:
		try {
			const data = fs.readFileSync(this.#path, "utf8");
			const dataArray = JSON.parse(data);
			return dataArray;
		} catch (err) {
			return `Error de lectura al obtener los productos: ${err}`;
		};
	};

	lastId() {
		const products = this.getProducts();

		// Obtener y devolver el ultimo ID:
		if (products.length > 0) {
			const lastId = products.reduce((maxId, product) => {
				return product.id > maxId ? product.id : maxId;
			}, 0);
			return lastId;
		};

		// Si el array está vacío, devolver 0:
		return 0;
	}

	addProduct(title, description, price, thumbnail, code, stock) {
		const products = this.getProducts();

		// Validar campos incompletos:
		if (!title || !description || !price || !thumbnail || !code || !stock) {
			return `Por favor completar todos los campos para agregar un producto`;
		};

		// Validar si el código existe:
		if (products.some((product) => product.code === code)) {
			return `El código ${code} ya existe`;
		};

		// Si es correcto, escribir el archivo:
		try {
			const id = this.lastId() + 1;
			const product = { id, title, description, price, thumbnail, code, stock };
			products.push(product);
			fs.writeFileSync(this.#path, JSON.stringify(products));
		} catch (err) {
			return `Error al agregar el producto: ${err}`;
		};
	};

	getProductById(id) {
		const products = this.getProducts();
		const product = products.find(product => product.id === id);

		// Validar si el producto existe:
		if (!product) {
			return `No hay producto con ID ${id}`;
		}

		return product;
	}

	updateProduct(id, field, value) {
		const products = this.getProducts();
		const product = products.find(product => product.id === id);

		// Validar el ID:
		if (!product) {
			return `No hay producto con ID ${id}`;
		};

		// Validar el campo:
		if (!(field in product)) {
			return `No hay campo "${field}" en el producto ${id}`;
		};

		// Validar valor:
		if (!value) {
			return `El valor es incorrecto`;
		};

		// Si es correcto, escribir el archivo:
		try {
			product[field] = value;
			fs.writeFileSync(this.#path, JSON.stringify(products));
		} catch (err) {
			return `Error al actualizar el producto: ${err}`;
		};
	};

	deleteProduct(id) {
		const products = this.getProducts();
		const productIndex = products.findIndex(product => product.id === id);

		// Validar ID:
		if (productIndex === -1) {
			return `No hay ningún producto con ID: ${id}`;
		};

		// Si es correcto, escribir el archivo:
		try {
			products.splice(productIndex, 1);
			fs.writeFileSync(this.#path, JSON.stringify(products));
		} catch (err) {
			return `Error al eliminar el producto: ${err}`;
		};
	};
};