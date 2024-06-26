const PurchaseHistory = require("../models/PurchaseHistory")
const Cart=require("../models/Cart")

// Get all purchase history
exports.getPurchaseHistory = async (req, res) => {
    try {
        const purchaseHistory = await PurchaseHistory.find();
        res.status(200).json(purchaseHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new purchase history entry
exports.createPurchaseHistory = async (req, res) => {
    try {
        console.log(`[Controller]-[createPurchaseHistory]`)
        const { user_id,netAmount } = req.body;
        const cartValue=await Cart.findOne({userId:user_id})
        // cartValue=response[0]
        console.log(cartValue);
    
        const newPurchaseHistory = new PurchaseHistory({ products:cartValue.products,userId:user_id,netAmount:netAmount,purchaseDate:new Date(),payment:true});

        const savedPurchaseHistory = await newPurchaseHistory.save();
        const updatedCart= await Cart.deleteOne({userId:user_id})
        // console.log(updatedCart);
        res.status(201).json(savedPurchaseHistory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a single purchase history entry by ID
exports.getPurchaseHistoryById = async (req, res) => {
    try {
        const purchaseHistory = await PurchaseHistory.findById(req.params.id);
        if (!purchaseHistory) {
            return res.status(404).json({ message: 'Purchase history not found' });
        }
        res.status(200).json(purchaseHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getPurchaseHistoryByUserId = async (req, res) => {
    try {
        const purchaseHistory = await PurchaseHistory.findOne({
            userId: req.body.user_id
        });
        if (!purchaseHistory) {
            return res.status(404).json({ message: 'Purchase history not found' });
        }
        res.status(200).json(purchaseHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updatePurchaseHistoryByUserId = async (req, res) => {
    try {
        const purchaseHistory = await PurchaseHistory.findOne({
            userId: req.body.user_id
        });
        if (!purchaseHistory) {
            return res.status(404).json({ message: 'Purchase history not found' });
        }
        res.status(200).json(purchaseHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a purchase history entry
exports.updatePurchaseHistory = async (req, res) => {
    try {
        const updatedPurchaseHistory = await PurchaseHistory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPurchaseHistory) {
            return res.status(404).json({ message: 'Purchase history not found' });
        }
        res.status(200).json(updatedPurchaseHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a purchase history entry
exports.deletePurchaseHistory = async (req, res) => {
    try {
        const deletedPurchaseHistory = await PurchaseHistory.findByIdAndDelete(req.params.id);
        if (!deletedPurchaseHistory) {
            return res.status(404).json({ message: 'Purchase history not found' });
        }
        res.status(200).json({ message: 'Purchase history deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
