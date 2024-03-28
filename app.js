// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const productRoutes = require('./routes/productRoutes');
const purchaseHistoryRoutes = require('./routes/purchaseHistoryRoutes');
const customerRoutes = require('./routes/customerRoutes');
const cartRoutes=require('./routes/cartRoutes')
const config = require('./config');

const app = express();
app.use(cors())
app.use(express.json());

app.use('/products', productRoutes);
app.use('/purchase-history', purchaseHistoryRoutes);
app.use('/customer', customerRoutes);
app.use('/cart',cartRoutes)

mongoose.connect(config.mongoURI)
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        })
    })
    .catch(error => console.error('MongoDB connection error:', error));

