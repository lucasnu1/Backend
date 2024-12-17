const express = require('express');
const ProductManager = require('../dao/ProductManager');
const validateProduct = require('../middlewares/validateProduct');
const router = express.Router();

const productManager = new ProductManager();

router.get('/', async (req, res, next) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts(Number(limit));
        res.json(products);
    } catch (err) {
        next(err);
    }
});

router.get('/:pid', async (req, res, next) => {
    try {
        const product = await productManager.getProductById(req.params.pid);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        next(err);
    }
});

router.post('/', validateProduct, async (req, res, next) => {
    try {
        const newProduct = await productManager.addProduct(req.body);
        res.status(201).json(newProduct);
    } catch (err) {
        next(err);
    }
});

router.put('/:pid', async (req, res, next) => {
    try {
        const updatedProduct = await productManager.updateProduct(req.params.pid, req.body);
        if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
        res.json(updatedProduct);
    } catch (err) {
        next(err);
    }
});

router.delete('/:pid', async (req, res, next) => {
    try {
        const deletedId = await productManager.deleteProduct(req.params.pid);
        if (!deletedId) return res.status(404).json({ error: 'Product not found' });
        res.json({ success: `Product ${deletedId} deleted` });
    } catch (err) {
        next(err);
    }
});

module.exports = router;