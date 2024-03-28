const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
        }
    ],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    netAmount:{type:Number,required:true}
});

module.exports = mongoose.model('Cart', cartSchema);
