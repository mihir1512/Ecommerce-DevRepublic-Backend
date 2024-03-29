const express = require('express');
const router = express.Router();
const { getProducts, createProduct, getProductsByFilter,getProductById, updateProduct, deleteProduct } = require('../controllers/productController');


router.get('id//:id', getProductById);
router.get('/', getProducts);
router.get('/filter',getProductsByFilter)
router.post('/', createProduct);
router.patch('id/:id', updateProduct);
router.delete('id//:id', deleteProduct);

module.exports = router;
