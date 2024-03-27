// app.js
const express = require('express');
const mongoose = require('mongoose');
// const productRoutes = require('./routes/productRoutes');
// const purchaseHistoryRoutes = require('./routes/purchaseHistoryRoutes');
const config = require('./config');

const app = express();

app.use(express.json());

// app.use('/products', productRoutes);
// app.use('/purchase-history', purchaseHistoryRoutes);

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {console.log('Connected to MongoDB')
    app.listen(config.port,()=>{
        console.log(`Server is running on port ${config.port}`);
    })
})
    .catch(error => console.error('MongoDB connection error:', error));

