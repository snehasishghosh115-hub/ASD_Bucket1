const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const cache = require('../middleware/cacheMiddleware');

router.get('/', (req, res) => res.redirect('/products'));
router.get('/products', cache.check, controller.getProducts);
router.get('/products/:id', cache.check, controller.getProductById);
router.post('/products', controller.createProduct);
router.put('/products/:id', controller.updateProduct);
router.patch('/products/:id', controller.updateProduct);
router.delete('/products/:id', controller.deleteProduct);

module.exports = router;
