const service = require('../services/productService');
const cache = require('../middleware/cacheMiddleware');

async function getProducts(req, res) {
    const products = await service.getProducts();
    cache.set(req.originalUrl, products);
    res.json(products);
}

async function getProductById(req, res) {
    const product = await service.getProductById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    cache.set(req.originalUrl, product);
    res.json(product);
}

async function createProduct(req, res) {
    const product = await service.createProduct(req.body);
    cache.clear();
    res.status(201).json(product);
}

async function updateProduct(req, res) {
    const product = await service.updateProduct(req.params.id, req.body);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    cache.clear();
    res.json(product);
}

async function deleteProduct(req, res) {
    const deleted = await service.deleteProduct(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    cache.clear();
    res.json({ message: 'Product deleted', deleted });
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
