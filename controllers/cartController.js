const { Types } = require("mongoose");
const Cart=require("../models/Cart")
const Product=require("../models/Product")

exports.increaseCartQty = async (req, res) => {
    try {
        console.log(req.params);
        const cartHistory = await Cart.findOne({
            userId: req.body.user_id
        });
        console.log(`[Cart History]-[${JSON.stringify(cartHistory)}]`);
        const product=await Product.findById(req.params.id)
       console.log(`[Products]-[${product}]`);

       const obj = cartHistory.products.find(item => item.productId ==req.params.id);

       console.log("/obj/",obj);
       if(!obj)
       {
            cartHistory.products.push({productId:req.params.id,quantity:1})
            cartHistory.netAmount+=product.price
            const response=await cartHistory.save()
            console.log(`[Cart History Response]-[${JSON.stringify(response)}]`);
       }
       else
       {
        cartHistory.products.forEach((item)=>{
            if(item.productId==req.params.id)
            {
                item.quantity=item.quantity+1;
            }
        })
        cartHistory.netAmount+=product.price
        const response=await cartHistory.save()
        console.log(`[Cart History Response]-[${JSON.stringify(response)}]`);
       }
    //    cartHistory.products.map((item)=>{
    //         item
    //    })
        res.status(200).json(cartHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
}

exports.decreaseCartQty = async (req, res) => {
    try {
        console.log(req.params);
        const cartHistory = await Cart.findOne({
            userId: req.body.user_id
        });
        console.log(`[Cart History]-[${JSON.stringify(cartHistory)}]`);
        const product=await Product.findById(req.params.id)
       console.log(`[Products]-[${product}]`);

       const obj = cartHistory.products.find(item => item.productId ==req.params.id);

       console.log("/obj/",obj);
       if(obj)
       {
        let temp=-1;
        cartHistory.products.forEach((item,index)=>{
            if(item.productId==req.params.id)
            {
                if(item.quantity===1)
                {
                    temp=index
                }
                else
                {
                item.quantity=item.quantity-1;
                cartHistory.netAmount-=product.price
                }
            }
        })
        if(temp!=-1)
        {
            cartHistory.products.splice(temp,1)
            cartHistory.netAmount-=product.price
        }
       
        const response=await cartHistory.save()
        console.log(`[Cart History Response]-[${JSON.stringify(response)}]`);
       }
      
    //    cartHistory.products.map((item)=>{
    //         item
    //    })
        res.status(200).json(cartHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
}

exports.createCart=async (req, res) => {
    try {
        const { productId, quantity, user_id } = req.body;

        // Find the cart for the given user
        let cart = await Cart.findOne({ userId :user_id});

        // If cart doesn't exist, create a new one
        if (!cart) {
            cart = new Cart({ userId:user_id, products: [{ productId, quantity }] });
        } else {
            // Check if the product already exists in the cart
            const existingProductIndex = cart.products.findIndex(product => product.productId === productId);

            if (existingProductIndex !== -1) {
                // If the product already exists, update its quantity
                cart.products[existingProductIndex].quantity += quantity;
            } else {
                // If the product doesn't exist, add it to the cart
                cart.products.push({ productId, quantity });
            }
        }

        // Save the cart to the database
        await cart.save();

        res.status(201).send(cart);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

exports.updateCart= async (req, res) => {
    try {
        // const { userId } = req.params;
        const { productId, quantity,user_id:userId } = req.body;

        // Find the cart for the given user
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).send('Cart not found');
        }

        // Find the index of the product in the cart
        const productIndex = cart.products.findIndex(product => product.productId == productId);

        if (productIndex === -1) {
            return res.status(404).send('Product not found in cart');
        }

        // Update the quantity of the product
        if(quantity===0)
        {
            cart.products.splice(productIndex,1)
        }
        else
        {
        cart.products[productIndex].quantity = quantity;
        }
        
        // Save the updated cart to the database
        await cart.save();

        res.send(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:error.message});
    }
}

exports.emptyCart=async(req,res)=>{
    try {
        const { user_id:userId } = req.body;
        await Cart.deleteOne({userId})
        res.status(200).json({message:'Cart deleted successfully'})
    } catch (error) {
        console.error(error);
        res.status(500).json({error:error.message});
    }
}

exports.fetchCart=async(req,res)=>{
    try {
        const { user_id:userId } = req.body; 
       const response= await Cart.aggregate([
            {
                $match:{
                    userId:new Types.ObjectId(userId)
                }
            },
            {
                $unwind:"$products"
            },
            {
                $lookup:{
                    from:'products',
                    localField:"products.productId",
                    foreignField:"_id",
                    as:'productData'
                }
            }
            ,
            {
                $unwind:"$productData"
            },
            {
                $addFields:{
                    totalProductPrice:{$multiply:["$products.quantity","$productData.price"]}
                }
            }
        ])
        res.status(200).json(response)
    } catch (error) {
        console.error(error);
        res.status(500).json({error:error.message});
    }
}