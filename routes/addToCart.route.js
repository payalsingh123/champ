const express = require("express")
const { addToCartModel } = require("../models/addToCart.model")
const { productModel } = require("../models/product.model")
const addToCartRouter = express.Router()
addToCartRouter.get("/", (req, res) => {
    res.send("all add to cart")
})

addToCartRouter.post("/", async (req, res) => {
    // res.send("all add to cart")
    try {
        console.log(req.body);
        await addToCartModel.create(req.body)
        res.send("one added to cart")
    } catch (error) {
        console.log("error while adding a cart");
        console.log(error);
    }
})
addToCartRouter.delete("/:id",async(req,res)=>{
    let ID=req.params.id
    try {
 
        await addToCartModel.destroy({
            where:{
                id:ID
            }
        })
        res.send("add to cart reoved")
    } catch (error) {
        res.send("error",error)
    }
})

addToCartRouter.get("/just", async (req, res) => {
    try {
        let cuId = req.query.id;
        let ans = await addToCartModel.findAll({
            where: {
                customerId: cuId
            },
            include: [{ model: productModel, required: true }]
        })
        res.send(ans )
    } catch (error) {
        res.send("error", error)
    }
})


module.exports = { addToCartRouter }