
const express = require('express');
const router = express.Router();
const { getPurchaseHistory, createPurchaseHistory, getPurchaseHistoryById, updatePurchaseHistory, deletePurchaseHistory, getPurchaseHistoryByUserId } = require('../controllers/purchaseHistoryController');
const { verifyToken } = require('../middlewares/authenticateMiddleware');

router.get('/', getPurchaseHistory);
router.get('/customer/history', verifyToken, getPurchaseHistoryByUserId);
router.post('/', verifyToken, createPurchaseHistory);
router.get('/:id', getPurchaseHistoryById);
router.delete('/:id', deletePurchaseHistory);

module.exports = router;
