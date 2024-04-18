const express= require("express")
const { orderModel } = require("../models/order.model")
const orderRouter=express.Router()
orderRouter.get("/",(req,res)=>{
    res.send("all orders")
})

orderRouter.post("/",async(req,res)=>{
    // res.send("all add to cart")
    try {
        await orderModel.create(req.body)
        res.send("one order created")
    } catch (error) {
        console.log(error);
        console.log("error while creating order");
    }
})

module.exports={orderRouter}