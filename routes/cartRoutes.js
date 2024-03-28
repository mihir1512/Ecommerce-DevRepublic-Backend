const express = require('express');
const { increaseCartQty ,decreaseCartQty} = require('../controllers/cartController');
const router = express.Router();
const { verifyToken } = require('../middlewares/authenticateMiddleware');

router.patch('/increaseQty/:id',verifyToken, increaseCartQty);
router.patch('/decreaseQty/:id',verifyToken, decreaseCartQty);


module.exports = router;