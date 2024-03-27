const mongoose = require('mongoose');

const purchaseHistorySchema = new mongoose.Schema({
    products:[{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },   
    }
    ],
    purchaseDate: { type: Date, default: Date.now },
    totalAmount:{type:Number,required:true}

});

module.exports = mongoose.model('PurchaseHistory', purchaseHistorySchema);
