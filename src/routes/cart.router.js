const express = require('express');
const CartManager = require('../dao/CartManager');
const router = express.Router();

const cartManager = new CartManager();

router.post('/', async (req, res, next) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (err) {
        next(err);
    }
});

router.get('/:cid', async (req, res, next) => {
    try {
        const cart = await cartManager.getCartById(req.params.cid);
        if (!cart) return res.status(404).json({ error: 'Cart not found' });
        res.json(cart);
    } catch (err) {
        next(err);
    }
});

router.post('/:cid/product/:pid', async (req, res, next) => {
    try {
        const updatedCart = await cartManager.addProductToCart(req.params.cid, req.params.pid);
        if (!updatedCart) return res.status(404).json({ error: 'Cart not found' });
        res.json(updatedCart);
    } catch (err) {
        next(err);
    }
});

module.exports = router;