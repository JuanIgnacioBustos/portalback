class ProductManager {
    constructor() {
      this.products = [];
      this.nextId = 1;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("Todos los campos son obligatorios");
        return;
      }
  
      const existingProduct = this.products.find(product => product.code === code);
      if (existingProduct) {
        console.log("El código de producto ya existe");
        return;
      }
  
      const product = {
        id: this.nextId++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      };
  
      this.products.push(product);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
      if (product) {
        return product;
      } else {
        console.log("No se encontró ningún producto con el ID especificado");
        return null;
      }
    }
}
  
const manager = new ProductManager();

manager.addProduct("Producto 1", "Descripción del producto 1", 10.99, "imagen1.jpg", "P1", 50); // ok

manager.addProduct("Producto 2", "Descripción del producto 2", 10.99, "imagen2.jpg", "P2", 20); // ok

manager.addProduct("Producto 3", "Descripción del producto 3", 10.99, "imagen3.jpg", "P3", 10); // ok

manager.addProduct("Producto 4", "Descripción del producto 4", 10.99, "imagen4.jpg", "P4"); //debe mostrar mensaje de error 

const products = manager.getProducts();

console.log(products);


console.log(manager.getProductById(2)); // debe mostrar los datos del pruducto 2

console.log(manager.getProductById(5)); // debe mostrar mensaje de error