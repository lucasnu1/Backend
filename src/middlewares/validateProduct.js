module.exports = (req, res, next) => {
    const { title, description, code, price, stock, category } = req.body;

    if (!title || !description || !code || !price || stock == null || !category) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    next();
};