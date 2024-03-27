
const express = require('express');
const router = express.Router();
const { getPurchaseHistory, createPurchaseHistory, getPurchaseHistoryById, updatePurchaseHistory, deletePurchaseHistory } = require('../controllers/purchaseHistoryController');

router.get('/', getPurchaseHistory);
router.post('/', createPurchaseHistory);
router.get('/:id', getPurchaseHistoryById);
router.delete('/:id', deletePurchaseHistory);

module.exports = router;
