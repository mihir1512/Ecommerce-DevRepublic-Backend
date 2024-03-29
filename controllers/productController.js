const Product=require("../models/Product")
const PurchaseHistory=require("../models/PurchaseHistory")

// Get all products
exports.getProducts = async (req, res) => {
    try {
        console.log(`[controller]-[Get All Products]`)
        const products = await Product.find();
        console.log(`[Products]-${JSON.stringify(products)}`);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getProductsByFilter=async(req,res)=>{
    try {
        console.log(`[controller]-[Get Products By Filter]`)
        
        if(req.query.category && req.query.price)
        {
            const minPrice=req.query.mnPrice
            const maxPrice=req.query.mxPrice
            const products = await Product.find( {
                category: req.query.category,
                price: { $gte: minPrice, $lte: maxPrice }     
            })
            console.log(`[Products]-${JSON.stringify(products)}`);
            return  res.status(200).json(products);
       }
       else if(req.query.category)
       {
            const products = await Product.find( {category: req.query.category})
            console.log(`[Products]-${JSON.stringify(products)}`);
            return  res.status(200).json(products);
       }
       else if(req.query.price)
       {
        const minPrice=req.query.mnPrice
        const maxPrice=req.query.mxPrice
        const products = await Product.find( {
            price: { $gte: minPrice, $lte: maxPrice }     
        })
        console.log(`[Products]-${JSON.stringify(products)}`);
        return  res.status(200).json(products);
       }
       else
       {
        return res.json({message:"Please pass filter parameter"})
       }

     } catch (error) {
        
        res.status(500).json({ message: error.message });
    }
}

// Product Creation
exports.createProduct = async (req, res) => {
    const { name, price, category } = req.body;
    console.log(`[Cotroller]-[Create Product]`);
    const newProduct = new Product({ name, price, category });

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.log(`[Error]-[${error.message}]`)
        res.status(400).json({ message: error.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);
        console.log(`[controller]-[Get Product By ID]`)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        console.log(`[products]-[${JSON.stringify(product)}]`);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Product Updation
exports.updateProduct = async (req, res) => {
    try {
        console.log(`[controller]-[Update Product]`)
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Product Deletion
exports.deleteProduct = async (req, res) => {
    try {
        console.log(`[Delete Product]`)
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
