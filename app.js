require('dotenv').config();
const express = require('express');
const productRouter = require('./src/routes/product.router');
const cartRouter = require('./src/routes/cart.router');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));