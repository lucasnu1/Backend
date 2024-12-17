const { v4: uuidv4 } = require('uuid');
const FileService = require('../services/FileService');
const path = process.env.PRODUCTS_FILE;

class ProductManager {
    async getProducts(limit) {
        const products = await FileService.readFile(path);
        return limit ? products.slice(0, limit) : products;
    }

    async getProductById(id) {
        const products = await FileService.readFile(path);
        return products.find(p => p.id === id);
    }

    async addProduct(product) {
        const products = await FileService.readFile(path);
        const newProduct = { id: uuidv4(), ...product, status: true, thumbnails: product.thumbnails || [] };
        products.push(newProduct);
        await FileService.writeFile(path, products);
        return newProduct;
    }

    async updateProduct(id, updatedFields) {
        const products = await FileService.readFile(path);
        const index = products.findIndex(p => p.id === id);
        if (index === -1) return null;

        products[index] = { ...products[index], ...updatedFields, id };
        await FileService.writeFile(path, products);
        return products[index];
    }

    async deleteProduct(id) {
        const products = await FileService.readFile(path);
        const filteredProducts = products.filter(p => p.id !== id);
        if (filteredProducts.length === products.length) return null;

        await FileService.writeFile(path, filteredProducts);
        return id;
    }
}

module.exports = ProductManager;