const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, enum : ['grocery','electronics','electric','furniture'],required: true }
});

module.exports = mongoose.model('Product', productSchema);
