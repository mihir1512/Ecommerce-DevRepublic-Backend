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