const express = require('express');
const { increaseCartQty ,decreaseCartQty,updateCart,createCart,emptyCart,fetchCart} = require('../controllers/cartController');
const router = express.Router();
const { verifyToken } = require('../middlewares/authenticateMiddleware');

router.post('/add',verifyToken, createCart);
router.patch('/update',verifyToken, updateCart);
router.delete("/empty",verifyToken,emptyCart)
router.get('/',verifyToken,fetchCart)


module.exports = router;