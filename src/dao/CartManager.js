const { v4: uuidv4 } = require('uuid');
const FileService = require('../services/FileService');
const path = process.env.CARTS_FILE;

class CartManager {
    async createCart() {
        const carts = await FileService.readFile(path);
        const newCart = { id: uuidv4(), products: [] };
        carts.push(newCart);
        await FileService.writeFile(path, carts);
        return newCart;
    }

    async getCartById(id) {
        const carts = await FileService.readFile(path);
        return carts.find(cart => cart.id === id);
    }

    async addProductToCart(cid, pid) {
        const carts = await FileService.readFile(path);
        const cart = carts.find(c => c.id === cid);
        if (!cart) return null;

        const productInCart = cart.products.find(p => p.product === pid);
        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await FileService.writeFile(path, carts);
        return cart;
    }
}

module.exports = CartManager;