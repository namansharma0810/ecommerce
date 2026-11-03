const express = require("express");
const router = express.Router();

const User = require("../models/users");
const Order=require("../models/Order")
const Product = require("../models/Products");
const isAuth = require("../middleware/isAuth");

router.post('/cart/add/:productId',isAuth,async (req,res) => {
    const { productId } = req.params; 
    const userId = req.user._id; // Securely getting the ID from Passport
    
    const user = await User.findById(userId);

    const existingItem = user.cart.find(
        item => item.productId.toString() === productId
    );

    if(existingItem){
        existingItem.quantity += 1;
    }
    else{
    user.cart.push({
        productId: productId,
        quantity: 1
    });
    } 
    await user.save(); // it used to save the data
    req.flash('success', 'Item added to cart!');
    res.redirect('/');

});

router.get("/cart",isAuth,async (req,res)=>{
    const userId = req.user._id;
    const user = await User.findById(userId).populate("cart.productId");
    
    res.render("../views/cart",{user});
})



router.post('/cart/increase/:productId',isAuth,async (req,res) => {
    const { productId } = req.params; 
    const userId = req.user._id; // Securely getting the ID from Passport
    
    const user = await User.findById(userId);

    const existingItem = user.cart.find(
        item => item.productId.toString() === productId
    );

    if(existingItem){
        existingItem.quantity += 1;
    }
    else{
    user.cart.push({
        productId: productId,
        quantity: 1
    });
    } 
    await user.save(); // it used to save the data
    
    res.redirect('/cart');

});

router.post("/cart/decrease/:productId",isAuth,async (req,res)=>{
    const { productId } = req.params; 
    const userId = req.user._id; // Securely getting the ID from Passport
    
    const user = await User.findById(userId);
    const existingItem = user.cart.find(
        item => item.productId.toString() === productId
    );
    if(existingItem){
        if(existingItem.quantity>1){
            existingItem.quantity--;
        }else{
            let ind = user.cart.indexOf(existingItem);
            user.cart.splice(ind,1);
        }

    }
    await user.save();
    res.redirect(req.get("Referrer"));
})

router.post("/cart/remove/:productId",isAuth,async (req,res)=>{
    const { productId } = req.params; 
    const userId = req.user._id; // Securely getting the ID from Passport
    
    const user = await User.findById(userId);
    const existingItem = user.cart.find(
        item => item.productId.toString() === productId
    );
    if(existingItem){
        let ind = user.cart.indexOf(existingItem);
        user.cart.splice(ind,1);

    }
    await user.save();
    res.redirect(req.get("Referrer"));
})

router.get("/order", isAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate("cart.productId");

        if (!user) {
            req.flash("error", "User not found");
            return res.redirect("/");
        }

        res.render("order.ejs", { user });
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
});

router.get("/myorders",isAuth,async(req,res)=>{
    const orders = await Order.find({
        userId: req.user._id
    }).sort({ createdAt: -1 });

    res.render('myorders', { orders });
})


module.exports = router;